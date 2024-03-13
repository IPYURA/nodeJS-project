import React from "react";
import { TableRow, TableCell } from "@mui/material";

interface IInfo {
  id: string;
  name: string;
  image: string;
  birthday: string;
  gender: string;
  job: string;
}

const Customer = ({ info }: { info: IInfo }) => {
  return (
    <TableRow>
      <TableCell>{info.id}</TableCell>
      <TableCell>
        <img src={info.image} alt="profile"></img>
      </TableCell>
      <TableCell>{info.name}</TableCell>
      <TableCell>{info.birthday}</TableCell>
      <TableCell>{info.gender}</TableCell>
      <TableCell>{info.job}</TableCell>
    </TableRow>
  );
};

export default Customer;
