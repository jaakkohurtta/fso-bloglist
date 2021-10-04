import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

import { setAlert } from "../reducers/alertReducer";
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogsReducer";

import {
  Button,
  Main,
  ContentHeader,
  ContentRow,
  Header3,
  Form,
  Input,
  InputGroup,
  Highlight,
} from "../theme/styledComponents";

const Blog = () => {
  const dispatch = useDispatch();

  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);

  const user = useSelector((state) => state.user);

  const [comment, setComment] = useState("");

  // Click handlers
  const handleBlogLikeButton = (blog) => {
    // console.log(blog)

    const likedBlog = {
      user: blog.userId.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: (blog.likes += 1),
    };

    dispatch(likeBlog(blog.id, likedBlog));
    dispatch(
      setAlert({
        message: `You liked ${likedBlog.title} by ${likedBlog.author}!`,
        type: "info",
        duration: 4,
      })
    );
  }; // Update blog likes

  const handleBlogDeleteButton = (blog) => {
    if (window.confirm(`Delete "${blog.title}"?`)) {
      dispatch(deleteBlog(blog.id));
      dispatch(
        setAlert({
          message: `"${blog.title}" deleted.`,
          type: "alert",
          duration: 4,
        })
      );
    }
  }; // Delete blog from db

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    dispatch(commentBlog(blog.id, { content: comment }));
    setComment("");

    e.target.reset();
  };

  if (!blog) {
    return <Redirect to="/" />;
  }

  return (
    <Main id="blog">
      <div style={{ marginBottom: "10px" }}>
        <ContentHeader flex>
          <span>{blog.title}</span>
          <span>
            <Button id="likeBtn" onClick={() => handleBlogLikeButton(blog)}>
              like
            </Button>
            {user.username === blog.userId.username ? (
              <Button id="deleteBtn" onClick={() => handleBlogDeleteButton(blog)}>
                delete blog
              </Button>
            ) : (
              <></>
            )}
          </span>
        </ContentHeader>
        <ContentRow flex>
          <Highlight>details</Highlight>
        </ContentRow>
        <ContentRow small>author: {blog.author}</ContentRow>
        <ContentRow small>{blog.url}</ContentRow>
        <ContentRow small>added by: {blog.userId.name}</ContentRow>
        <ContentRow margin>
          likes: <Highlight>{blog.likes}</Highlight>
        </ContentRow>
      </div>
      <Header3>Comments</Header3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <Form inline onSubmit={handleCommentSubmit}>
        <InputGroup>
          <Input type="text" placeholder="Add a comment.." onChange={(e) => setComment(e.target.value)} />
          <Button type="submit">submit</Button>
        </InputGroup>
      </Form>
    </Main>
  );
};

export default Blog;
