import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import type React from "react";

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleClearCart: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  handleClose,
  handleClearCart,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            정말 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>아니오</Button>
          <Button
            onClick={() => {
              handleClearCart();
              handleClose();
            }}
            autoFocus
          >
            예
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

export default DeleteDialog;
