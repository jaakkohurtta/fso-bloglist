import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Main, ContentHeader, ContentRow, Highlight } from "../theme/styledComponents";

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }

  return (
    <Main>
      <ContentHeader>{user.name}</ContentHeader>
      {user.blogsAdded.length !== 0 ? (
        <ContentRow flex>
          <Highlight>blogs added</Highlight>
        </ContentRow>
      ) : (
        ""
      )}
      {user.blogsAdded.map((blog) => (
        <ContentRow margin key={blog.id}>
          {blog.title}
        </ContentRow>
      ))}
    </Main>
  );
};

export default User;
