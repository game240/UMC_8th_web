import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const LpCommentOption: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`absolute -bottom-full -right-full bg-black z-10 ${className}`}>
      <div className="flex">
        <button className="cursor-pointer">
          <EditOutlinedIcon sx={{ color: "white" }} />
        </button>
        <button className="cursor-pointer">
          <DeleteOutlinedIcon sx={{ color: "white" }} />
        </button>
      </div>
    </div>
  );
};

export default LpCommentOption;
