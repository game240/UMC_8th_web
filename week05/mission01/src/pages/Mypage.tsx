import { useLocalStorage } from "../hooks/useLocalStorage";

const Mypage = () => {
  const { getItem: getName } = useLocalStorage("name");
  return (
    <main className="w-full p-20">
      <section className="flex flex-col items-center">
        <p>닉네임: {getName()}</p>
      </section>
    </main>
  );
};

export default Mypage;
