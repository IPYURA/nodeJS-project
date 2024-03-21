import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";

interface IProps {
  isOpen: boolean;
  closeModal: (state: boolean) => void;
}

const NoticeModal = ({ isOpen, closeModal }: IProps) => {
  return (
    <>
      <Dialog
        open={isOpen}
        style={{
          position: "absolute",
          zIndex: "9999",
        }}
      >
        <DialogTitle style={{ padding: "12px 18px", textAlign: "left" }}>
          알림
        </DialogTitle>
        <DialogContent style={{ padding: "12px 18px" }}>
          첨부한 이미지가 없거나,
          <br /> 작성하지 않은 항목이 있습니다.
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => closeModal(false)}
            style={{ margin: "6px" }}
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoticeModal;
