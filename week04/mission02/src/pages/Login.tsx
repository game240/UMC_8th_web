import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "../components/TextField";

import google from "./../assets/google.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full pt-20 text-white">
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
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button className="w-full h-10 rounded-[8px] text-white bg-[#111]" disabled>
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
