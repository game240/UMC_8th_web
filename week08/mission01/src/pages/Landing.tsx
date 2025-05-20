import { useInfiniteQuery, QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import ItemThumbnail from "../components/landing/ItemThumbnail";
import LandingSkeleton from "../components/landing/LandingSkeleton";
import Toggle from "../components/Toggle";

import axiosClient from "../services/api";

import { Lp } from "../types/lp";

import "./../../node_modules/react-loading-skeleton/dist/skeleton.css";
import { User } from "../types/user";

interface LpPage {
  lps: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
}

const Landing = () => {
  const { data: userData } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/v1/users/me");
      return data.data;
    },
  });

  const fetchLps = async (context: QueryFunctionContext) => {
    const { pageParam = 0 } = context;
    const { data } = await axiosClient.get("/v1/lps", {
      params: { cursor: pageParam, limit: 10 },
    });
    return {
      lps: data.data.data,
      nextCursor: data.data.nextCursor,
      hasNext: data.data.hasNext,
    };
  };

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<LpPage, Error>({
      queryKey: ["lps"],
      queryFn: fetchLps,
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor! : undefined),
      initialPageParam: 0,
    });

  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);
    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <main className="px-[6%] size-full">
        <section className="flex flex-col gap-4 mb-4">
          <div className="flex justify-end w-full pr-[2%]">
            <Toggle />
          </div>
        </section>
        <LandingSkeleton />
      </main>
    );
  }

  if (isError) {
    return <div>에러 발생: {(error as Error).message}</div>;
  }

  return (
    <main className="px-[6%] size-full">
      <section className="flex flex-col gap-4 mb-4">
        <div className="flex justify-end w-full pr-[2%]">
          <Toggle />
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data?.pages.map((page) =>
          page.lps.map((lp) => (
            <ItemThumbnail
              key={lp.id}
              lp={lp}
              isLiked={lp.likes.some((like) => like.userId === userData?.id)}
            />
          ))
        )}
      </section>

      <div ref={loadMoreRef} className="h-1"></div>
      {isFetchingNextPage && <LandingSkeleton />}
      {!hasNextPage && <p>마지막 페이지입니다.</p>}
    </main>
  );
};

export default Landing;
