import { useLocation } from "react-router-dom";

import Toggle from "../components/Toggle";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { datesFromNow } from "../utils/datesFromNow";

import { Lp, LpComment } from "../types/lp";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useRef } from "react";
import axiosClient from "../services/api";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import LpCommentSkeleton from "../components/LpCommentSkeleton";

interface CommentPage {
  comments: LpComment[];
  nextCursor: number | null;
  hasNext: boolean;
}

const LP = () => {
  const { lp } = useLocation()?.state as { lp: Lp };

  const { getItem } = useLocalStorage("name");

  const fetchComments = async (context: QueryFunctionContext) => {
    const { pageParam = 0 } = context;
    const { data } = await axiosClient.get(`/v1/lps/${lp.id}/comments`, {
      params: { cursor: pageParam, limit: 10 },
    });
    return {
      comments: data.data.data,
      nextCursor: data.data.nextCursor,
      hasNext: data.data.hasNext,
    };
  };

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<CommentPage, Error>({
      queryKey: ["lpComments"],
      queryFn: fetchComments,
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

  if (isError) {
    return <div>에러 발생: {(error as Error).message}</div>;
  }

  return (
    <main className="flex justify-center pt-4 size-full">
      <section className="pt-6 px-[5%] w-[70%] bg-[#28292E] rounded-[10px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-[#111]"></div>
            <p>{getItem()}</p>
          </div>
          <p>{datesFromNow(lp.createdAt)}</p>
        </div>

        <div className="flex justify-between mt-4">
          <p>{lp.title}</p>
          <div className="flex items-center gap-2">
            <button>
              <EditIcon sx={{ color: "white" }} />
            </button>
            <button>
              <DeleteIcon sx={{ color: "white" }} />
            </button>
          </div>
        </div>

        <div className="flex justify-center w-full mt-10 mb-4">
          <div
            className="flex-center w-1/2 aspect-square"
            style={{
              boxShadow: `
              0 -4px 6px rgba(0,0,0,0.2),
              4px  0 6px rgba(0,0,0,0.2),
              0   12px 6px rgba(0,0,0,0.2),
             -4px  0 6px rgba(0,0,0,0.2)
            `,
            }}
          >
            <div
              className="flex-center size-[90%] rounded-full bg-cover bg-no-repeat bg-center border-2 border-black animate-spin"
              style={{
                backgroundImage: `url(${lp.thumbnail})`,
                animation: "spin 8s linear infinite",
              }}
            >
              <div className="size-[15%] rounded-full bg-white z-10 border-1 border-black"></div>
            </div>
          </div>
        </div>

        <p>{lp.content}</p>

        <p className="flex-center mt-4">
          <p className="text-pink-500">♥</p> &nbsp;{lp.likes.length}
        </p>

        <section className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>댓글</p>
            <Toggle />
          </div>
          <div className="flex gap-4">
            <input
              className="flex-1 px-2 border-1 border-solid border-gray-400 text-white rounded-[6px]"
              placeholder="댓글을 입력해주세요"
            />
            <button className="px-4 py-1 bg-gray-400 text-white rounded-[4px]">작성</button>
          </div>
          <div className="w-full">
            {data?.pages.map((page) =>
              page.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex justify-between items-center gap-2 mb-4 group"
                >
                  <div className="flex gap-2">
                    <div className="size-8 rounded-full bg-[#111]"></div>
                    <div>
                      <p>{comment.author.name}</p>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                  <button className="hidden group-hover:block">
                    <MoreVertIcon sx={{ color: "white" }} />
                  </button>
                </div>
              ))
            )}
            <div ref={loadMoreRef} className="h-1"></div>
            {(isLoading || isFetchingNextPage) && <LpCommentSkeleton />}
            {!hasNextPage && <p className="text-center text-gray-400">마지막 댓글입니다.</p>}
          </div>
        </section>
      </section>
    </main>
  );
};

export default LP;
