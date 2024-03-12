import React from "react";

interface IUserInfo {
  birth: string;
  gender: string;
  job: string;
}

const CustomerInfo = ({ birth, gender, job }: IUserInfo) => {
  return (
    <div>
      <p>{birth}</p>
      <p>{gender}</p>
      <p>{job}</p>
    </div>
  );
};

export default CustomerInfo;
