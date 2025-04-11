import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import BottomBtn from "../components/BottomBtn";
import TextField from "../components/textfield/TextField";

import { useLocalStorage } from "../hooks/useLocalStorage";

import axiosClient from "../services/api";

import { EMAIL_REGEX } from "../constants/regex";

import google from "./../assets/google.png";

const signinSchema = z.object({
  email: z.string().nonempty().regex(EMAIL_REGEX, "올바른 이메일 형식을 입력해주세요."),
  password: z.string().nonempty().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

type SigninRequest = z.infer<typeof signinSchema>;

interface SigninResponse {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setItem: setAccessToken } = useLocalStorage("accessToken");
  const { setItem: setRefreshToken } = useLocalStorage("refreshToken");

  const navigate = useNavigate();

  const onSubmit = async (zData: SigninRequest) => {
    try {
      const { data } = await axiosClient.post<SigninResponse>("/v1/auth/signin", zData);

      alert("로그인 성공!");

      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data.message);
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        <h1 className="text-xl">로그인</h1>
      </div>
      <div className="flex flex-col items-center gap-4 mt-8 w-[300px]">
        <button
          type="button"
          className="relative w-full h-12 border-[1px] border-white rounded-[8px]"
        >
          <img src={google} alt="" className="absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6" />
          구글 로그인
        </button>

        <div className="flex items-center justify-between w-full">
          <hr className="w-1/4 border-[1px] border-[#fff]" />
          <p>OR</p>
          <hr className="w-1/4 border-[1px] border-[#fff]" />
        </div>

        <TextField
          type="text"
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
          error={watch("email")?.length > 0 && !!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...register("password")}
          error={watch("password")?.length > 0 && !!errors.password}
          helperText={errors.password?.message}
        />

        <BottomBtn disabled={!isValid}>로그인</BottomBtn>
      </div>
    </form>
  );
};

export default Login;
