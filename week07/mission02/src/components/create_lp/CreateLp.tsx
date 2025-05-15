import { useMutation } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

import CreateLpTag from "./CreateLpTag";

import axiosClient from "../../services/api";

import lp from "./../../assets/lp.png";

interface CreateLpProps {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
}

interface FormInputs {
  lpName: string;
  lpContent: string;
  lpTag: string;
}

interface CreateLpRequest {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

const CreateLp: React.FC<CreateLpProps> = ({ openDialog, setOpenDialog }) => {
  const [tags, setTags] = useState<string[]>([]);
  const { register, handleSubmit, watch, setValue } = useForm<FormInputs>();

  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const createLpMutation = useMutation({
    mutationFn: async (data: CreateLpRequest) => {
      const response = await axiosClient.post("/v1/lps", data);
      return response.data;
    },
    onSuccess: () => {
      setOpenDialog(false);
      alert("LP 생성 성공");
    },
    onError: (error) => {
      alert("LP 생성 실패:" + error);
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    setUploadedFileUrl(fileUrl);
  }, []);

  useEffect(() => {
    return () => {
      if (uploadedFileUrl) {
        URL.revokeObjectURL(uploadedFileUrl);
      }
    };
  }, [uploadedFileUrl]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: false,
  });

  const onCreateLp = (data: FormInputs) => {
    const lpData: CreateLpRequest = {
      title: data.lpName,
      content: data.lpContent,
      thumbnail: uploadedFileUrl || "",
      tags: tags,
      published: true,
    };

    createLpMutation.mutate(lpData);
  };

  return (
    <div className="p-4 h-[80vh] bg-[#28292E] overflow-hidden border-none">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setOpenDialog(!openDialog);
          }}
        >
          <CloseIcon sx={{ color: "white" }} />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <div className="relative w-1/2 aspect-square">
          <img
            src={uploadedFileUrl || lp}
            alt="lp"
            className="w-full h-full object-cover rounded-full"
          />
          {uploadedFileUrl && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[25%] bg-white border-1 border-black rounded-full"></div>
          )}
          <div
            {...getRootProps()}
            className="absolute top-0 left-0 w-full h-full rounded-full cursor-pointer"
          >
            <input {...getInputProps()} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onCreateLp)} className="flex flex-col items-center gap-4 mt-16">
        <div className="flex flex-col items-center gap-4 w-[80%]">
          <input
            className="px-2 w-full h-12 border-1 border-solid border-gray-400 text-white rounded-[6px]"
            placeholder="LP Name"
            {...register("lpName")}
          />

          <input
            className="px-2 w-full h-12 border-1 border-solid border-gray-400 text-white rounded-[6px]"
            placeholder="LP Content"
            {...register("lpContent")}
          />

          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2">
              <input
                className="flex-1 px-2 h-12 border-1 border-solid border-gray-400 text-white rounded-[6px]"
                placeholder="LP Tag"
                {...register("lpTag")}
              />
              <button
                type="button"
                className="px-6 py-1 rounded-[10px] text-white bg-pink-500 disabled:bg-gray-400"
                disabled={!watch("lpTag")}
                onClick={() => {
                  const tag = watch("lpTag");
                  if (tag) {
                    if (!tags.includes(tag)) {
                      setTags([...tags, tag]);
                      setValue("lpTag", "");
                    }
                  }
                }}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <CreateLpTag
                  key={tag}
                  onRemove={() => {
                    setTags(tags.filter((t) => t !== tag));
                  }}
                >
                  {tag}
                </CreateLpTag>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 py-4 w-full rounded-[10px] text-white bg-pink-500 disabled:bg-gray-400"
            disabled={!watch("lpName") || !watch("lpContent")}
          >
            Add LP
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLp;
