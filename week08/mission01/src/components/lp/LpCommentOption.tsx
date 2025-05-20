import { AxiosError } from "axios";

import axiosClient from "../../services/api";

import { LpComment } from "../../types/lp";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface LpCommentOptionProps {
  className?: string;
  comment: LpComment;
  isAuthor: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const LpCommentOption: React.FC<LpCommentOptionProps> = ({
  className,
  comment,
  isAuthor,
  setIsEdit,
}) => {
  if (!isAuthor) {
    return null;
  }

  const onDeleteComment = async () => {
    try {
      const { data } = await axiosClient.delete(`/v1/lps/${comment.lpId}/comments/${comment.id}`, {
        params: {
          lpId: comment.lpId,
          commentId: comment.id,
        },
      });

      alert(data.data.message);
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
    }
  };

  return (
    <div className={`absolute -bottom-full -right-full bg-black z-10 ${className}`}>
      <div className="flex">
        <button
          className="cursor-pointer"
          onClick={() => {
            setIsEdit(true);
          }}
        >
          <EditOutlinedIcon sx={{ color: "white" }} />
        </button>
        <button className="cursor-pointer" onClick={onDeleteComment}>
          <DeleteOutlinedIcon sx={{ color: "white" }} />
        </button>
      </div>
    </div>
  );
};

export default LpCommentOption;
