import React, { useRef } from "react";
import { useSelector } from "react-redux";

import Toggler from "./Toggler";
import NewBlogForm from "./NewBlogForm";

import { StyledLink, Main, ContentHeader, ContentRow, Highlight } from "../theme/styledComponents";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  const newBlogFormRef = useRef();

  return (
    <Main>
      <ContentHeader>
        <Toggler buttonLabel="Post New Blog" buttonClasses="" cancelId="NewBlogForm" ref={newBlogFormRef}>
          <NewBlogForm togglerRef={newBlogFormRef} />
        </Toggler>
      </ContentHeader>
      <ContentRow flex>
        <Highlight>blogs</Highlight>
      </ContentRow>
      {blogs.map((blog) => (
        <ContentRow className="blog-container" margin key={blog.id}>
          <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
        </ContentRow>
      ))}
    </Main>
  );
};

export default Blogs;
