import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import axiosClient from "../services/api";

interface WithdrawalModalProps {
  open: boolean;
  onClose: () => void;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ open, onClose }) => {
  const onClickWithdrawal = async () => {
    await axiosClient.delete("/v1/users");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#28292E",
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle>회원 탈퇴</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "white" }}>정말 탈퇴하시겠습니까?</DialogContentText>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              onClickWithdrawal();
              onClose();
            }}
          >
            예
          </Button>
          <Button variant="contained" onClick={onClose} autoFocus>
            아니오
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawalModal;
