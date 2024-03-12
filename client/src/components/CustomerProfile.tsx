import React from "react";

interface IProfile {
  image: string;
  name: string;
  id: string;
}

const CustomerProfile = ({ image, name, id }: IProfile) => {
  return (
    <div>
      <img src={image} alt="profile" />
      <h2>
        {name} #{id}
      </h2>
    </div>
  );
};

export default CustomerProfile;
