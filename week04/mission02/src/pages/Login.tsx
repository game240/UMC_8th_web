import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "../components/TextField";

import { EMAIL_REGEX } from "../constants/regex";

import google from "./../assets/google.png";

const Login = () => {
  const [email, setEmail] = useState({
    value: "",
    show: false,
    format: false,
  });
  const [password, setPassword] = useState({
    value: "",
    show: false,
    format: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setEmail((prevEmail) => ({
      ...prevEmail,
      show: email.value.length > 0,
      format: EMAIL_REGEX.test(prevEmail.value),
    }));
    setPassword((prevPassword) => ({
      ...prevPassword,
      show: password.value.length > 0,
      format: password.value.length >= 8,
    }));
  }, [email.value, password.value]);

  return (
    // TODO: onSubmit 연결 필요
    <form className="flex flex-col items-center justify-center w-full pt-20 text-white">
      <div className="relative w-[300px] flex justify-center">
        <button
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
        <button className="relative w-full h-12 border-[1px] border-white rounded-[8px]">
          <img src={google} className="absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6" />
          구글 로그인
        </button>

        <div className="flex items-center justify-between w-full">
          <hr className="w-1/4 border-[1px] border-[#fff]" />
          <p className="">OR</p>
          <hr className="w-1/4 border-[1px] border-[#fff]" />
        </div>

        <TextField
          type="text"
          placeholder="이메일을 입력해주세요!"
          value={email.value}
          onChange={(event) => {
            setEmail((prevEmail) => ({
              ...prevEmail,
              value: event.target.value,
            }));
          }}
          error={email.show && !email.format}
          helperText="올바른 이메일 형식을 입력해주세요."
        />
        <TextField
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          value={password.value}
          onChange={(event) => {
            setPassword((prevPassword) => ({
              ...prevPassword,
              value: event.target.value,
            }));
          }}
          error={password.show && !password.format}
          helperText="비밀번호는 8자 이상이어야 합니다."
        />
        <button
          type="submit"
          className="w-full h-10 rounded-[8px] text-white bg-[#111]"
          disabled={!email.format || !password.format}
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default Login;
