import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import { AlertMsg } from "../theme/styledComponents";

const Alert = () => {
  const { message, type } = useSelector((state) => state.alert);

  const alertStyle = {
    backgroundColor: type === "alert" ? "#fffafa" : "#fafffa",
    border: type === "alert" ? "2px solid #ffcccc" : "2px solid #ccffcc",
  };

  if (message) {
    return <AlertMsg style={alertStyle}>{message}</AlertMsg>;
  } else {
    return <Fragment />;
  }
};

export default Alert;
