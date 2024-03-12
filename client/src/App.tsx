import React from "react";
import "./App.css";
import Customer from "./components/Customer";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
} from "@mui/material";

// interface IInfo {
//   id: string;
//   name: string;
//   image: string;
//   birth: string;
//   gender: string;
//   job: string;
// }

const info = [
  {
    id: "1",
    name: "조동건",
    image: "https://picsum.photos/id/259/64/64",
    birth: "980413",
    gender: "남",
    job: "대학생",
  },
  {
    id: "2",
    name: "강민주",
    image: "https://picsum.photos/id/223/64/64",
    birth: "981007",
    gender: "여",
    job: "대학생",
  },
  {
    id: "3",
    name: "이름이",
    image: "https://picsum.photos/id/227/64/64",
    birth: "981112",
    gender: "여",
    job: "대학생",
  },
];

function App() {
  return (
    <>
      <Table>
        <CustomTableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>사진</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {info.map((info, index) => (
            <Customer key={index} info={info} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default App;

const CustomTableHead = styled(TableHead)`
  background: #1a1a1a;
  * {
    color: #fff;
  }
`;
