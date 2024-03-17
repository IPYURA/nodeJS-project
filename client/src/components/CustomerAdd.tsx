import React, { ChangeEvent, useState } from "react";
import axios from "axios";

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
  const [userInfo, setUserInfo] = useState<IData>({
    file: null, //바이트 형태의 데이터 의미?
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
    //react는 바뀐 부분만 렌더링하기 때문에 데이터가 추가되면 다시 받아와야 한다.
    console.log("submit 실행");
    const { file, username, birthday, gender, job } = userInfo;
    if (!file) {
      console.log("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("name", username);
    formData.append("image", file);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);
    //id는 어캐함?

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

    //userInfo 초기화
    setUserInfo({
      file: null,
      username: "",
      birthday: "",
      gender: "",
      job: "",
    });
    // window.location.reload();
    
  };

  console.log("[userInfo]", userInfo);
  return (
    <form onSubmit={handleUpload}>
      <h1>고객 추가</h1>
      <div>
        프로필 이미지:{" "}
        <input
          type="file"
          name="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />
      </div>
      <div>
        이름:{" "}
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleValueChange}
        />
      </div>
      <div>
        생년원일:{" "}
        <input
          type="text"
          name="birthday"
          value={userInfo.birthday}
          onChange={handleValueChange}
          placeholder="ex) 980101"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>
          남자
          <input
            type="radio"
            name="gender"
            value="남자"
            checked={userInfo.gender === "남자"}
            onChange={handleValueChange}
          />
        </label>
        <label>
          여자
          <input
            type="radio"
            name="gender"
            value="여자"
            checked={userInfo.gender === "여자"}
            onChange={handleValueChange}
          />
        </label>
      </div>
      <div>
        직업:{" "}
        <input
          type="text"
          name="job"
          value={userInfo.job}
          onChange={handleValueChange}
        />
      </div>
      <button type="submit">추가하기</button>
    </form>
  );
};

export default CustomerAdd;

//   const addCustomer = () => {
//     const url = "/api/customers";
//     const formData = new FormData();
//     formData.append("image", userInfo.file);
//     formData.append("name", userInfo.username);
//     formData.append("birthday", userInfo.birthday);
//     formData.append("gender", userInfo.gender);
//     formData.append("job", userInfo.job);
//     //파일이 포함된 것을 웹 서버로 보낼 때에는 웹 표준을 지켜줘야한다.
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data", //전달하는 요소에 파일이 포함된 경우 설정해줘야 한다.
//       },
//     };
//     return post(url, formData, config);//axios 이전방식이라서 바꿔야될듯
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     addCustomer().then((res) => res.data);
//   };

//   const handleFileChange = (e:React.FormEvent<HTMLInputElement>) => {
//     setUserInfo({ ...userInfo, file: e.target.files[0] });
//   };

//   const handleValueChange = (e) => {
//     const target = e.target.name;
//     setUserInfo({ ...userInfo, target: e.target.value });
//   };
