import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import Navbar from "./Navbar";

import { AppHeader, AppTitle, UserInfo } from "../theme/styledComponents";

const Header = () => {
  const user = useSelector((state) => state.user);

  return (
    <AppHeader>
      <AppTitle>Bloglist</AppTitle>
      {user ? <UserInfo>logged in as {user.name}</UserInfo> : <Fragment />}
      {user ? <Navbar user={user} /> : <Fragment />}
    </AppHeader>
  );
};

export default Header;
