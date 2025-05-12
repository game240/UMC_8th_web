import Dialog from "@mui/material/Dialog";
import clsx from "clsx";
import { useState } from "react";

import CreateLp from "./create_lp/CreateLp";

import AddIcon from "@mui/icons-material/Add";

const FloatingAddBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <button
        className={clsx("flex-center w-20 h-20 rounded-full bg-pink-500", className)}
        onClick={() => {
          setOpenDialog(true);
        }}
        {...props}
      >
        <AddIcon sx={{ fontSize: "3rem", color: "white" }} />
      </button>
      <Dialog
        open={openDialog}
        maxWidth="sm"
        fullWidth={true}
        onClose={() => {
          setOpenDialog(false);
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "10px",
              overflow: "hidden",
            },
          },
        }}
      >
        <CreateLp openDialog={openDialog} setOpenDialog={setOpenDialog} />
      </Dialog>
    </div>
  );
};

export default FloatingAddBtn;
