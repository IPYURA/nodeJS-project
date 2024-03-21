import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  styled,
} from "@mui/material";

const CustomerDelete = ({
  cusID,
  stateRefresh,
}: {
  cusID: string;
  stateRefresh: () => void;
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onClickOpen = () => {
    setModalOpen(!modalOpen);
  };

  const deleteCustomer = (id: string) => {
    const url = `/api/customers/` + id;
    console.log("[url]", url);
    fetch(url, { method: "DELETE" });
    stateRefresh();
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={onClickOpen}>
        삭제
      </Button>
      <Dialog open={modalOpen}>
        <DialogTitle>삭제하기</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
        </DialogContent>
        <ButtonWrap>
          <Button
            variant="contained"
            color="primary"
            onClick={() => deleteCustomer(cusID)}
          >
            삭제
          </Button>
          <Button variant="outlined" color="primary" onClick={onClickOpen}>
            취소
          </Button>
        </ButtonWrap>
      </Dialog>
    </>
  );
};

export default CustomerDelete;

const ButtonWrap = styled(DialogActions)`
  padding: 0 24px 16px;
`;
