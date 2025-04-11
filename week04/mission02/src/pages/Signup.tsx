import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import BottomBtn from "../components/BottomBtn";
import TextField from "../components/textfield/TextField";
import TextFieldPw from "../components/textfield/TextFieldPw";

import axiosClient from "../services/api";

import { EMAIL_REGEX } from "../constants/regex";

import google from "./../assets/google.png";

const signupSchema = z.object({
  email: z.string().nonempty().regex(EMAIL_REGEX, "올바른 이메일 형식을 입력해주세요.").optional(),
  password: z.string().nonempty().min(8, "비밀번호는 8자 이상이어야 합니다!").optional(),
  passwordCheck: z.string().nonempty().optional(),
  name: z.string().nonempty().optional(),
  // 나중에 추가될 수 있음
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

interface SignupRequest {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
}

interface SignupResponse {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

const Signup = () => {
  /** 0: 이메일, 1: 비밀번호, 2: 프로필 */
  const [step, setStep] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // let currentStepSchema
  let defaultValues;
  if (step === 0) {
    // currentStepSchema = emailSchema;
    defaultValues = { email: "" };
  } else if (step === 1) {
    // currentStepSchema = passwordSchema;
    defaultValues = { password: "", passwordCheck: "" };
  } else {
    // currentStepSchema = nameSchema;
    defaultValues = { name: "" };
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    shouldUnregister: true,
    defaultValues: defaultValues,
  });

  const navigate = useNavigate();

  const onClickRegister = async () => {
    try {
      const { data } = await axiosClient.post<SignupResponse>("/v1/auth/signup", {
        name: watch("name"),
        email,
        password,
      } as SignupRequest);

      console.log(data);
      alert("회원가입에 성공했습니다.");

      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data.message);
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }
  };

  return (
    <form
      key={step}
      onSubmit={(event) => {
        // 새로고침 방지
        event.preventDefault();
        if (step === 0) {
          trigger("email").then((valid) => {
            if (valid) {
              setEmail(watch("email") ?? "");
              setStep((prev) => prev + 1);
            }
          });
        } else if (step === 1) {
          trigger(["password", "passwordCheck"]).then((valid) => {
            if (valid) {
              setPassword(watch("password") ?? "");
              setStep((prev) => prev + 1);
            }
          });
        } else {
          handleSubmit(onClickRegister)(); // 바로 함수 실행
        }
      }}
      className="flex flex-col items-center justify-center w-full pt-20 text-white"
    >
      <div className="relative w-[300px] flex justify-center">
        <button
          type="button"
          className="text-xl absolute left-2"
          onClick={() => {
            navigate(-1);
          }}
        >
          {"<"}
        </button>
        <h1 className="text-xl">회원가입</h1>
      </div>
      <div className="flex flex-col items-center gap-4 mt-8 w-[300px]">
        {step !== 2 && (
          <>
            <button
              type="button"
              className="relative w-full h-12 border-[1px] border-white rounded-[8px]"
            >
              <img
                src={google}
                alt=""
                className="absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6"
              />
              구글 로그인
            </button>

            <div className="flex items-center justify-between w-full">
              <hr className="w-1/4 border-[1px] border-[#fff]" />
              <p>OR</p>
              <hr className="w-1/4 border-[1px] border-[#fff]" />
            </div>
          </>
        )}

        {step === 0 ? (
          <>
            <TextField
              type="text"
              placeholder="이메일을 입력해주세요!"
              {...register("email")}
              error={(watch("email")?.length ?? 0) > 0 && !!errors.email}
              helperText={errors.email?.message}
            />
            <BottomBtn disabled={!isValid}>다음</BottomBtn>
          </>
        ) : step === 1 ? (
          <>
            <p className="w-full">✉️ {email}</p>
            <TextFieldPw
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              {...register("password")}
              error={(watch("password")?.length ?? 0) > 0 && !!errors.password}
              helperText={errors.password?.message}
            />
            <TextFieldPw
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요!"
              {...register("passwordCheck")}
              error={(watch("passwordCheck")?.length ?? 0) > 0 && !!errors.passwordCheck}
              helperText={errors.passwordCheck?.message}
            />

            <BottomBtn disabled={!isValid}>다음</BottomBtn>
          </>
        ) : (
          <>
            <div className="w-40 h-40 bg-white rounded-full mb-4"></div>
            <TextField type="text" placeholder="닉네임을 입력해주세요!" {...register("name")} />

            <BottomBtn disabled={!isValid}>회원가입 완료</BottomBtn>
          </>
        )}
      </div>
    </form>
  );
};

export default Signup;
