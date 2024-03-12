import React from "react";
// import CustomerProfile from "./CustomerProfile";
// import CustomerInfo from "./CustomerInfo";
import { TableRow,TableCell } from "@mui/material";

interface IInfo {
  id: string;
  name: string;
  image: string;
  birth: string;
  gender: string;
  job: string;
}

const Customer = ({ info }: { info: IInfo }) => {
  return (
    // <div>
    //   <CustomerProfile image={info.image} name={info.name} id={info.id} />
    //   <CustomerInfo birth={info.birth} gender={info.gender} job={info.job} />
    // </div>
    <TableRow>
        <TableCell>{info.id}</TableCell>
        <TableCell><img src={info.image} alt="profile"></img></TableCell>
        <TableCell>{info.name}</TableCell>
        <TableCell>{info.birth}</TableCell>
        <TableCell>{info.gender}</TableCell>
        <TableCell>{info.job}</TableCell>
    </TableRow>
  );
};

export default Customer;
