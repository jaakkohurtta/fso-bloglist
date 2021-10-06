import React from "react";
import { useDispatch } from "react-redux";

import { setAlert } from "../reducers/alertReducer";
import { createNewBlog } from "../reducers/blogsReducer";
import { useField } from "../hooks/index";

import styled from "styled-components";
import { Button, Form, Input, InputGroup, Header3 } from "../theme/styledComponents";

const Label = styled.label`
  display: inline-block;
  color: dimgray;
  width: 50px;
  padding-right: 5px;
`;

const NewBlogForm = ({ togglerRef }) => {
  const dispatch = useDispatch();

  const newBlogTitle = useField("text", null);
  const newBlogAuthor = useField("text", null);
  const newBlogUrl = useField("text", null);

  const handleNewBlogFormSubmit = async (e, newBlog) => {
    // console.log(newBlog)

    e.preventDefault();
    e.target.reset();
    togglerRef.current.toggleVisibility();

    dispatch(createNewBlog(newBlog));
    dispatch(
      setAlert({
        message: `"${newBlog.title}" by ${newBlog.author} added to database.`,
        type: "info",
        duration: 4,
      })
    );
  }; // Create new blog

  return (
    <span>
      <Header3>Post New Blog</Header3>
      <Form
        id="newBlogForm"
        style={{ display: "inline" }}
        onSubmit={(e) =>
          handleNewBlogFormSubmit(e, {
            title: newBlogTitle.props.value,
            author: newBlogAuthor.props.value,
            url: newBlogUrl.props.value,
          })
        }>
        <InputGroup>
          <Label>title</Label>
          <Input wide {...newBlogTitle.props} />
        </InputGroup>
        <InputGroup>
          <Label>author</Label>
          <Input wide {...newBlogAuthor.props} />
        </InputGroup>
        <InputGroup>
          <Label>url</Label>
          <Input wide {...newBlogUrl.props} />
        </InputGroup>
        <Button marginleft type="submit">
          post
        </Button>
      </Form>
    </span>
  );
};

export default NewBlogForm;
