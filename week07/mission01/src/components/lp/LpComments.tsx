import {
  useQueryClient,
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { RefObject, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import Toggle from "../Toggle";
import LpCommentSkeleton from "./LpCommentSkeleton";
import LpCommentOption from "./LpCommentOption";

import useOutsideClick from "../../hooks/useOutsideClick";

import { datesFromNow } from "../../utils/datesFromNow";

import axiosClient from "../../services/api";

import { LpComment } from "../../types/lp";

import MoreVertIcon from "@mui/icons-material/MoreVert";

interface CommentPage {
  comments: LpComment[];
  nextCursor: number | null;
  hasNext: boolean;
}

interface CommentFormData {
  comment: string;
}

interface LpCommentsProps {
  lpId: number;
}

const LpComments: React.FC<LpCommentsProps> = ({ lpId }) => {
  const [openOptions, setOpenOptions] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { isOutside } = useOutsideClick({ ref: containerRef as RefObject<HTMLElement> });
  const queryClient = useQueryClient();
  const { register, handleSubmit, watch, setValue } = useForm<CommentFormData>();

  useEffect(() => {
    if (isOutside) {
      setOpenOptions({});
    }
  }, [isOutside]);

  const fetchComments = async ({ pageParam = 0 }: QueryFunctionContext) => {
    const { data } = await axiosClient.get(`/v1/lps/${lpId}/comments`, {
      params: { cursor: pageParam, limit: 10 },
    });
    return {
      comments: data.data.data,
      nextCursor: data.data.nextCursor,
      hasNext: data.data.hasNext,
    };
  };

  const postComment = useMutation({
    mutationFn: (data: CommentFormData) =>
      axiosClient.post(`/v1/lps/${lpId}/comments`, { content: data.comment }, { params: { lpId } }),
    onSuccess: () => {
      setValue("comment", "");
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
  });

  const onSubmit = (data: CommentFormData) => {
    postComment.mutate(data);
  };

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<CommentPage, Error>({
      queryKey: ["lpComments", lpId],
      queryFn: fetchComments,
      getNextPageParam: (last) => (last.hasNext ? last.nextCursor! : undefined),
      initialPageParam: 0,
    });

  // IntersectionObserver로 다음 페이지 로딩
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) fetchNextPage();
    });
    obs.observe(loadMoreRef.current);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isError) {
    return <div>댓글 로딩 에러: {error!.message}</div>;
  }

  return (
    <section className="flex flex-col gap-4" ref={containerRef}>
      <div className="flex justify-between items-center">
        <p>댓글</p>
        <Toggle />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
        <input
          {...register("comment")}
          placeholder="댓글을 입력해주세요"
          className="flex-1 px-2 border border-gray-400 rounded text-white"
        />
        <button
          type="submit"
          disabled={!watch("comment")}
          className="px-4 py-1 bg-pink-500 text-white rounded disabled:bg-gray-400"
        >
          작성
        </button>
      </form>

      <div className="space-y-4">
        {data?.pages.map((page) =>
          page.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex justify-between items-center group"
              onMouseLeave={() => {
                setOpenOptions({});
              }}
            >
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-[#111]"></div>
                <div>
                  <p className="font-semibold">{comment.author.name}</p>
                  <p>{comment.content}</p>
                  <p className="text-xs text-gray-400">{datesFromNow(comment.createdAt)}</p>
                </div>
              </div>
              <div className="relative">
                <button
                  className="hidden group-hover:block"
                  onClick={() => {
                    setOpenOptions((options) => ({
                      ...options,
                      [comment.id]: !options[comment.id],
                    }));
                  }}
                >
                  <MoreVertIcon sx={{ color: "white" }} />
                </button>

                {openOptions[comment.id] && (
                  <LpCommentOption className="hidden group-hover:block" />
                )}
              </div>
            </div>
          ))
        )}

        <div ref={loadMoreRef} className="h-1"></div>
        {(isLoading || isFetchingNextPage) && <LpCommentSkeleton />}
        {!hasNextPage && <p className="text-center text-gray-400">마지막 댓글입니다.</p>}
      </div>
    </section>
  );
};

export default LpComments;
