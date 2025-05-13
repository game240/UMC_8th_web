import { useLocation } from "react-router-dom";

import LpComments from "../components/lp/LpComments";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { datesFromNow } from "../utils/datesFromNow";

import { Lp } from "../types/lp";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const LP = () => {
  const { lp } = useLocation()?.state as { lp: Lp };
  const { getItem } = useLocalStorage("name");

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
          <span className="text-pink-500">♥</span> &nbsp;{lp.likes.length}
        </p>

        <LpComments lpId={lp.id} />
      </section>
    </main>
  );
};

export default LP;
