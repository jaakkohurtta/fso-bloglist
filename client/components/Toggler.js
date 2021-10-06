import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

import { Button } from "../theme/styledComponents";

const Toggler = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = {
    display: visible ? "none" : "",
  };
  const showWhenVisible = {
    display: visible ? "" : "none",
    width: "100%",
  };

  const handleTogglerClick = (e) => {
    // console.log(e)
    if (e.target.id && e.target.id !== "NewBlogForm") {
      e.target.id === "UserControl" ? props.setActiveForm(null) : props.setActiveForm(e.target.id);
    }

    toggleVisibility();
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
      hide,
    };
  });

  return (
    <div style={{ width: "100%" }}>
      <div style={hideWhenVisible}>
        <Button id={props.buttonId} className={props.buttonClasses} onClick={handleTogglerClick}>
          {props.buttonLabel}
        </Button>
      </div>
      <div id="togglerContent" style={showWhenVisible}>
        {props.children}
        <Button id={props.cancelId} onClick={handleTogglerClick}>
          cancel
        </Button>
      </div>
    </div>
  );
});

Toggler.displayName = "Toggler";

Toggler.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonClasses: PropTypes.string,
  buttonId: PropTypes.string,
  cancelId: PropTypes.string,
  setActiveForm: PropTypes.func,
};

export default Toggler;
