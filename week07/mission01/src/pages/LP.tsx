import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

import LpComments from "../components/lp/LpComments";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { datesFromNow } from "../utils/datesFromNow";

import axiosClient from "../services/api";

import { Lp } from "../types/lp";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

interface UpdateLpRequest {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

const LP = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const navigate = useNavigate();
  const { lp } = useLocation()?.state as { lp: Lp };
  const { getItem } = useLocalStorage("name");

  useEffect(() => {
    setLikeCount(lp.likes.length);
  }, [lp.likes]);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<UpdateLpRequest>({
    defaultValues: {
      title: lp.title,
      content: lp.content,
      thumbnail: lp.thumbnail,
      tags: lp.tags.map((tag) => tag.name),
      published: lp.published,
    },
    mode: "onChange",
  });

  const updateLpMutation = useMutation({
    mutationFn: async (data: UpdateLpRequest) => {
      console.log("Request Data:", data);
      const response = await axiosClient.patch(`/v1/lps/${lp.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      setIsEdit(false);
      alert("LP가 성공적으로 업데이트되었습니다.");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error("Error Response:", error.response?.data);
        alert(error.response?.data.message || "LP 업데이트에 실패했습니다.");
      }
    },
  });

  const deleteLpMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosClient.delete(`/v1/lps/${lp.id}`);
      return response.data;
    },
    onSuccess: () => {
      alert("LP가 성공적으로 삭제되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error("Error Response:", error.response?.data);
        alert(error.response?.data.message || "LP 삭제에 실패했습니다.");
      }
    },
  });

  const onSubmit = (data: Pick<UpdateLpRequest, "title" | "content">) => {
    const basePayload = {
      title: data.title,
      content: data.content,
      thumbnail: lp.thumbnail,
      published: lp.published,
    };

    // tags가 하나라도 있을 땐 basePayload에 tags 추가, 없으면 tags 필드 없이 보내기
    const payload =
      lp.tags.length > 0 ? { ...basePayload, tags: lp.tags.map((t) => t.name) } : basePayload;

    updateLpMutation.mutate(payload as UpdateLpRequest);

    setIsEdit(false);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    if (window.confirm("정말로 이 LP를 삭제하시겠습니까?")) {
      deleteLpMutation.mutate();
    }
  };

  const onClickLike = async () => {
    try {
      if (!isLiked) {
        await axiosClient.post(`/v1/lps/${lp.id}/likes`);
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      } else {
        await axiosClient.delete(`/v1/lps/${lp.id}/likes`);
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message || "좋아요 처리에 실패했습니다.");
      }
    }
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between mt-4 w-full">
          {!isEdit ? (
            <p>{lp.title}</p>
          ) : (
            <input
              className="w-full text-white bg-transparent border-b border-gray-600 focus:outline-none focus:border-white"
              type="text"
              {...register("title", { required: true })}
            />
          )}
          <div className="flex items-center gap-2">
            {!isEdit ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setIsEdit(true);
                    reset();
                  }}
                >
                  <EditIcon sx={{ color: "white" }} />
                </button>
                <button type="button" onClick={handleDelete}>
                  <DeleteIcon sx={{ color: "white" }} />
                </button>
              </>
            ) : (
              <button
                type="submit"
                disabled={!isValid}
                className={`${!isValid ? "opacity-50 cursor-default" : "cursor-pointer"}`}
              >
                <SaveOutlinedIcon sx={{ color: "white" }} />
              </button>
            )}
          </div>
        </form>

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

        {!isEdit ? (
          <p>{lp.content}</p>
        ) : (
          <textarea
            className="w-full text-white bg-transparent border-b border-gray-600 focus:outline-none focus:border-white"
            {...register("content", { required: true })}
          />
        )}

        <p className="flex-center mt-4">
          <span className="text-pink-500">
            <button onClick={onClickLike}>{!isLiked ? "♡" : "♥"}</button>
          </span>
          &nbsp;{likeCount}
        </p>

        <LpComments lpId={lp.id} />
      </section>
    </main>
  );
};

export default LP;
