import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../reducers/userReducer";
import blogService from "../services/blogs";
import Toggler from "./Toggler";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

import { Main } from "../theme/styledComponents";

const UserControl = () => {
  const dispatch = useDispatch();

  const [activeForm, setActiveForm] = useState(null);
  const signUpFormRef = useRef();
  const logInFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (activeForm === "LogIn") {
      signUpFormRef.current.hide();
    }
    if (activeForm === "SignUp") {
      logInFormRef.current.hide();
    }
    if (!activeForm) {
      signUpFormRef.current.hide();
      logInFormRef.current.hide();
    }
  }, [activeForm, signUpFormRef, logInFormRef]);

  return (
    <Main>
      <Toggler
        buttonLabel="login >"
        buttonClasses="no-border-btn"
        buttonId="LogIn"
        cancelId="UserControl"
        setActiveForm={setActiveForm}
        ref={logInFormRef}>
        <LoginForm />
      </Toggler>
      <div style={{ height: "5px" }}></div>
      <Toggler
        buttonLabel="sign up >"
        buttonClasses="no-border-btn"
        buttonId="SignUp"
        cancelId="UserControl"
        setActiveForm={setActiveForm}
        ref={signUpFormRef}>
        <SignUpForm setActiveForm={setActiveForm} />
      </Toggler>
    </Main>
  );
};

export default UserControl;
