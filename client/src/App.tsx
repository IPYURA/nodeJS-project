import React, { useState, useEffect } from "react";
import "./App.css";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import {
  styled,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";

interface IInfo {
  id: string;
  name: string;
  image: string;
  birthday: string;
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
    getData();
  }, []);

  const stateRefresh = () => {
    setCustomerData([
      {
        id: "",
        name: "",
        image: "",
        birthday: "",
        gender: "",
        job: "",
      },
    ]);
    getData();
  };

  console.log("customerData: ", customerData);
  if (customerData !== undefined) {
    console.log("customerData-ID: ", typeof customerData[0].id);
  }
  return (
    <>
      <Table>
        <CustomTableHead>
          <TableRow>
            <CustomTableCell>ID</CustomTableCell>
            <CustomTableCell>사진</CustomTableCell>
            <CustomTableCell>이름</CustomTableCell>
            <CustomTableCell>생년월일</CustomTableCell>
            <CustomTableCell>성별</CustomTableCell>
            <CustomTableCell>직업</CustomTableCell>
            <CustomTableCell>설정</CustomTableCell>
          </TableRow>
        </CustomTableHead>

        {isLoading ? (
          <TableBody>
            <TableRow style={{ height: "calc(100vh - 58px" }}>
              <TableCell align="center" colSpan={7}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody style={{ overflow: "scroll" }}>
            {customerData?.map((info, index) => (
              <Customer key={index} info={info} stateRefresh={stateRefresh} />
            ))}
          </TableBody>
        )}
      </Table>
      <CustomerAdd stateRefresh={stateRefresh} />
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
