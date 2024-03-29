import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  styled,
} from "@mui/material";
import NoticeModal from "./NoticeModal";

interface IData {
  file: File | null;
  username: string;
  birthday: string;
  gender: string;
  job: string;
}
interface Ifunc {
  stateRefresh: () => void;
}

const CustomerAdd = ({ stateRefresh }: Ifunc) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [secondModalOpen, setsecondModalOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IData>({
    file: null,
    username: "",
    birthday: "",
    gender: "",
    job: "",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, file: e.target.files![0] });
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleUpload = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = checkValid();
    if (valid) {
      const { file, username, birthday, gender, job } = userInfo;
      const formData = new FormData();
      formData.append("name", username);
      formData.append("image", file!);
      formData.append("birthday", birthday);
      formData.append("gender", gender);
      formData.append("job", job);
      const config = {
        headers: {
          "content-type": "multipart/form-data", //전달하는 요소에 파일이 포함된 경우 설정해줘야 한다.
        },
      };
      axios
        .post("/api/customers", formData, config)
        .then((response) => {
          console.log("Upload successful:", response.data);
          stateRefresh(); //고객 데이터를 받고 나서 수행되도록
        })
        .catch((error) => {
          console.error("Upload failed:", error);
        });

      setUserInfo({
        file: null,
        username: "",
        birthday: "",
        gender: "",
        job: "",
      });
      setModalOpen(false);
    } else {
      setsecondModalOpen(true);
    }
  };

  const onClickOpen = () => {
    setModalOpen(!modalOpen);
  };
  const checkValid = () => {
    return userInfo.file === null ||
      userInfo.username === "" ||
      userInfo.birthday === "" ||
      userInfo.gender === "" ||
      userInfo.job === ""
      ? false
      : true;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <AddButton variant="contained" color="primary" onClick={onClickOpen}>
        고객 추가하기
      </AddButton>
      <Dialog open={modalOpen} onClose={onClickOpen}>
        <form onSubmit={handleUpload}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent style={{ padding: "10px" }}>
            <input
              type="file"
              name="file"
              accept="image/png, image/jpeg, image/jpg"
              id="fileup"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <FileLabel htmlFor="fileup">
              {userInfo.file === null
                ? "프로필 이미지 선택"
                : userInfo.file.name}
            </FileLabel>
            <TextField
              label="이름"
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleValueChange}
              placeholder="ex) 홍길동"
              size="small"
            />
            <TextField
              inputProps={{
                maxLength: 6,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              label="생년월일"
              type="text"
              name="birthday"
              value={userInfo.birthday}
              onChange={handleValueChange}
              placeholder="ex) 980101"
              size="small"
            />
            <RadioGroup
              value={userInfo.gender}
              name="gender"
              onChange={handleValueChange}
              row
            >
              <FormControlLabel value="남자" control={<Radio />} label="남자" />
              <FormControlLabel value="여자" control={<Radio />} label="여자" />
            </RadioGroup>
            <TextField
              label="직업"
              type="text"
              name="job"
              value={userInfo.job}
              onChange={handleValueChange}
              size="small"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" type="submit">
              추가
            </Button>
            <Button variant="outlined" color="primary" onClick={onClickOpen}>
              닫기
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <NoticeModal isOpen={secondModalOpen} closeModal={setsecondModalOpen} />
    </div>
  );
};

export default CustomerAdd;

const FileLabel = styled("label")({
  width: "auto",
  height: "40px",
  borderRadius: "4px",
  display: "grid",
  placeItems: "center",
  background: "#1976D2",
  color: "#fff",
  marginBottom: "10px",
  cursor: "pointer",
});

const AddButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;
