import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";

import lp from "../assets/lp.png";

interface CreateLpProps {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
}

interface FormInputs {
  lpName: string;
  lpContent: string;
}

const CreateLp: React.FC<CreateLpProps> = ({ openDialog, setOpenDialog }) => {
  const { register, handleSubmit, watch } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
    // 여기에 LP 추가 로직 구현
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
        <div className="w-1/2 aspect-square">
          <img src={lp} alt="lp" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 mt-16">
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

          <div className="flex gap-2 w-full">
            <input
              className="flex-1 px-2 h-12 border-1 border-solid border-gray-400 text-white rounded-[6px]"
              placeholder="LP Tag"
            />
            <button
              type="button"
              className="px-6 py-1 rounded-[10px] text-white bg-pink-500 disabled:bg-gray-400"
            >
              Add
            </button>
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
