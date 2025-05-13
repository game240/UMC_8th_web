import React, { useState } from "react";

import LpCommentOption from "./LpCommentOption";

import { useLocalStorage } from "../../hooks/useLocalStorage";

import { datesFromNow } from "../../utils/datesFromNow";

import { LpComment } from "../../types/lp";

import MoreVertIcon from "@mui/icons-material/MoreVert";

interface LpEachCommentProps {
  comment: LpComment;
}

const LpEachComment: React.FC<LpEachCommentProps> = ({ comment }) => {
  const [openOptions, setOpenOptions] = useState(false);

  const { getItem } = useLocalStorage("name");

  return (
    <div
      key={comment.id}
      className="flex justify-between items-center group"
      onMouseLeave={() => {
        setOpenOptions(false);
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
            setOpenOptions(true);
          }}
        >
          <MoreVertIcon sx={{ color: "white" }} />
        </button>

        {openOptions && (
          <LpCommentOption
            className="hidden group-hover:block"
            isAuthor={comment.author.name === getItem()}
          />
        )}
      </div>
    </div>
  );
};

export default LpEachComment;
