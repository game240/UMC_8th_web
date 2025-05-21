import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import LpCommentOption from "./LpCommentOption";

import { useLocalStorage } from "../../hooks/useLocalStorage";

import { datesFromNow } from "../../utils/datesFromNow";

import axiosClient from "../../services/api";

import { LpComment } from "../../types/lp";

import CheckIcon from "@mui/icons-material/Check";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface LpEachCommentProps {
  comment: LpComment;
}

interface ContentFormData {
  content: string;
}

const LpEachComment: React.FC<LpEachCommentProps> = ({ comment }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { getItem } = useLocalStorage("name");

  const { register, handleSubmit, setValue } = useForm<ContentFormData>();

  const queryClient = useQueryClient();

  const onSubmitChangeComment = (data: ContentFormData) => {
    patchChangeComment.mutate(data);
    setIsEdit(false);
  };

  const patchChangeComment = useMutation({
    mutationFn: (data: ContentFormData) =>
      axiosClient.patch(
        `/v1/lps/${comment.lpId}/comments/${comment.id}`,
        { content: data.content },
        { params: { lpId: comment.lpId, commentId: comment.id } }
      ),
    onSuccess: () => {
      setValue("content", "");
      queryClient.invalidateQueries({ queryKey: ["lpComments", comment.lpId] });
    },
  });

  return (
    <form
      key={comment.id}
      className="flex justify-between items-center group"
      onMouseLeave={() => {
        setOpenOptions(false);
      }}
      onSubmit={handleSubmit(onSubmitChangeComment)}
    >
      <div className="flex gap-2 w-full">
        <div className="w-8 h-8 rounded-full bg-[#111]"></div>
        <div className="w-full">
          <p className="font-semibold">{comment.author.name}</p>
          {!isEdit ? (
            <p>{comment.content}</p>
          ) : (
            <input
              className="w-3/4 text-white"
              placeholder="댓글을 입력해주세요"
              {...register("content")}
            />
          )}
          <p className="text-xs text-gray-400">{datesFromNow(comment.createdAt)}</p>
        </div>
      </div>
      {!isEdit && (
        <div className="relative">
          <button
            className="hidden group-hover:block"
            onClick={() => {
              setOpenOptions(true);
            }}
          >
            <MoreVertIcon sx={{ color: "white" }} />
          </button>

          {openOptions && (
            <LpCommentOption
              className="hidden group-hover:block"
              comment={comment}
              isAuthor={comment.author.name === getItem()}
              setIsEdit={setIsEdit}
            />
          )}
        </div>
      )}
      {isEdit && (
        <button type="submit">
          <CheckIcon sx={{ color: "white" }} />
        </button>
      )}
    </form>
  );
};

export default LpEachComment;
