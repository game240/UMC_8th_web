import { AxiosError } from "axios";
import { useEffect, useState, useCallback } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { useLocalStorage } from "../hooks/useLocalStorage";

import axiosClient from "../services/api";

import { User } from "../types/user";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useForm } from "react-hook-form";

interface GetUserResponse {
  data: User;
}

interface UpdateUserRequest {
  name: string;
  bio?: string;
  avatar?: string;
}

const Mypage = () => {
  const [bio, setBio] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const queryClient = useQueryClient();
  const { getItem: getName, setItem: setName } = useLocalStorage("name");

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosClient.get<GetUserResponse>("/v1/users/me");
      return response.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<UpdateUserRequest>({
    defaultValues: {
      name: getName(),
      bio: bio || "",
      avatar: avatar || "",
    },
    mode: "onChange",
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateUserRequest) => {
      const response = await axiosClient.patch("/v1/users", data);
      return response.data;
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });
      const previousData = queryClient.getQueryData(["user"]);

      queryClient.setQueryData(["user"], (old: GetUserResponse | undefined) => ({
        ...old,
        data: {
          ...old?.data,
          name: newData.name,
          bio: newData.bio,
          avatar: newData.avatar,
        },
      }));

      setName(newData.name);
      setBio(newData.bio || "");
      setAvatar(newData.avatar || "");
      setIsEdit(false);

      return { previousData };
    },
    onError: (error, newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["user"], context.previousData);
      }
      if (error instanceof AxiosError) {
        alert(error?.response?.data.message || "프로필 업데이트에 실패했습니다.");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const onFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    setUploadedAvatar(fileUrl);
  }, []);

  useEffect(() => {
    return () => {
      if (uploadedAvatar) {
        URL.revokeObjectURL(uploadedAvatar);
      }
    };
  }, [uploadedAvatar]);

  useEffect(() => {
    if (userData) {
      setName(userData.data.name);
      setBio(userData.data.bio || "");
      setEmail(userData.data.email || "");
      setAvatar(userData.data.avatar || "");
    }
  }, [userData, setName]);

  const handleUpdateProfile = (data: UpdateUserRequest) => {
    setIsEdit(!isEdit);

    const updateData: UpdateUserRequest = {
      name: data.name,
      bio: data.bio,
      avatar: uploadedAvatar || "",
    };

    updateUserMutation.mutate(updateData);
  };

  return (
    <main className="w-full p-20">
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="flex justify-center items-start gap-4"
      >
        <div className="relative">
          <div
            className="size-20 rounded-full bg-[#111] bg-cover bg-center"
            style={{ backgroundImage: `url(${uploadedAvatar || avatar})` }}
          ></div>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div>
          {!isEdit ? (
            <>
              <p className="text-lg font-bold">{getName()}</p>
              <h6>{bio || <h6>&nbsp;</h6>}</h6>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="닉네임"
                className="px-2 h-10 border-1 border-solid border-gray-400 text-white rounded-[6px] bg-transparent"
                {...register("name", { required: true })}
              />
              <input
                type="text"
                placeholder="소개"
                className="px-2 h-10 border-1 border-solid border-gray-400 text-white rounded-[6px] bg-transparent"
                {...register("bio")}
              />
            </div>
          )}
          <h6>{email || <h6>&nbsp;</h6>}</h6>
        </div>
        <button
          type={!isEdit ? "button" : "submit"}
          onClick={(event) => {
            if (!isEdit) {
              event.preventDefault();
              setIsEdit(true);
            }
          }}
          disabled={isEdit && !isValid}
          className={`${isEdit && !isValid ? "opacity-50 cursor-default" : "cursor-pointer"}`}
        >
          {isEdit ? (
            <SaveOutlinedIcon sx={{ color: "white" }} />
          ) : (
            <EditOutlinedIcon sx={{ color: "white" }} />
          )}
        </button>
      </form>
    </main>
  );
};

export default Mypage;
