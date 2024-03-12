import React, { useState, useEffect } from "react";
import "./App.css";
import Customer from "./components/Customer";
import {
  styled,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";

//info 는 이 코드에서 삭제함. 새로 받아올 것.
interface IInfo {
  id: string;
  name: string;
  image: string;
  birth: string;
  gender: string;
  job: string;
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [customerData, setCustomerData] = useState<IInfo[]>();

  const getData = async () => {
    const url = "/api/customers/"; //localhost:5050 빼니까 됐음.
    await fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setCustomerData(res);
        setIsLoading(false);
      })
      .catch((err) => console.log("[에러 발생]", err));
  };

  useEffect(() => {
    console.log("useEffect 실행");
    getData();
  }, []);

  console.log(customerData);
  console.log(isLoading);

  return (
    <>
      <Table>
        <CustomTableHead>
          <TableRow>
            <CustomTableCell>번호</CustomTableCell>
            <CustomTableCell>사진</CustomTableCell>
            <CustomTableCell>이름</CustomTableCell>
            <CustomTableCell>생년월일</CustomTableCell>
            <CustomTableCell>성별</CustomTableCell>
            <CustomTableCell>직업</CustomTableCell>
          </TableRow>
        </CustomTableHead>

        {isLoading ? (
          <TableBody>
            <TableRow style={{ height: "calc(100vh - 57px" }}>
              <TableCell align="center" colSpan={6}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {customerData?.map((info, index) => (
              <Customer key={index} info={info} />
            ))}
          </TableBody>
        )}
      </Table>
    </>
  );
}

export default App;

const CustomTableHead = styled(TableHead)`
  background: #1a1a1a;
`;
const CustomTableCell = styled(TableCell)`
  color: #fff;
`;
