import React from "react";
import { useSelector } from "react-redux";

import { Main, ContentHeader, ContentRow, StyledLink, Highlight } from "../theme/styledComponents";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <Main>
      <ContentHeader>Users</ContentHeader>
      {users.map((user, index) => (
        <ContentRow margin key={user.username}>
          <span style={{ display: "inline-block", width: "200px" }}>
            <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
          </span>
          <span>
            <Highlight>{user.blogsAdded.length}</Highlight>
            {index === 0 ? " blogs added" : ""}
          </span>
        </ContentRow>
      ))}
    </Main>
  );
};

export default Users;
