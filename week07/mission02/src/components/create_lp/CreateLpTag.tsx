import CloseIcon from "@mui/icons-material/Close";
import { PropsWithChildren } from "react";

interface CreateLpTagProps {
  onRemove: () => void;
}

const CreateLpTag: React.FC<PropsWithChildren<CreateLpTagProps>> = ({ children, onRemove }) => {
  return (
    <div className="flex items-center gap-2 px-2 py-1 border-1 border-solid border-gray-400 rounded-[5px] ">
      <p>{children}</p>
      <button className="flex-center" onClick={onRemove}>
        <CloseIcon sx={{ width: "1rem", height: "1rem", color: "white" }} />
      </button>
    </div>
  );
};

export default CreateLpTag;
