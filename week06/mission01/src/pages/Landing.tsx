import { useQuery } from "@tanstack/react-query";

import ItemThumbnail from "../components/landing/ItemThumbnail";
import Toggle from "../components/landing/Toggle";

import axiosClient from "../services/api";

import { Lp } from "../types/lp";

const Landing = () => {
  const fetchLps = async () => {
    const { data } = await axiosClient.get("/v1/lps");
    return data.data.data;
  };

  const {
    data: lps,
    isLoading,
    isError,
    error,
  } = useQuery<Lp[]>({
    queryKey: ["lps"],
    queryFn: fetchLps,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (isError) {
    return <div>에러 발생: {(error as Error).message}</div>;
  }

  return (
    <main className="flex flex-col gap-4 pt-20 px-[6%] size-full">
      <div className="flex justify-end w-full pr-[2%]">
        <Toggle />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {lps!.map((lp) => (
          <ItemThumbnail key={lp.id} lp={lp} />
        ))}
      </section>
    </main>
  );
};

export default Landing;
