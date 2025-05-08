import { AxiosError } from "axios";
import { useEffect } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

import axiosClient from "../services/api";

const Mypage = () => {
  const { getItem: getName } = useLocalStorage("name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosClient.get("/v1/auth/protected");
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error?.response?.data.message);
        } else {
          alert("내 정보 조회에 실패했습니다.");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <main className="w-full p-20">
      <section className="flex flex-col items-center">
        <p>닉네임: {getName()}</p>
      </section>
    </main>
  );
};

export default Mypage;
