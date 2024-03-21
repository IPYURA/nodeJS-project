import React from "react";
import { TableRow, TableCell } from "@mui/material";
import CustomerDelete from "./CustomerDelete";

interface IInfo {
  id: string;
  name: string;
  image: string;
  birthday: string;
  gender: string;
  job: string;
}

const Customer = ({
  info,
  stateRefresh,
}: {
  info: IInfo;
  stateRefresh: () => void;
}) => {
  return (
    <TableRow>
      <TableCell>{info.id}</TableCell>
      <TableCell>
        <img
          src={info.image}
          alt="profile"
          style={{ width: "64px", height: "64px" }}
        ></img>
      </TableCell>
      <TableCell>{info.name}</TableCell>
      <TableCell>{info.birthday}</TableCell>
      <TableCell>{info.gender}</TableCell>
      <TableCell>{info.job}</TableCell>
      <TableCell>
        <CustomerDelete stateRefresh={stateRefresh} cusID={info.id} />
      </TableCell>
    </TableRow>
  );
};

export default Customer;
