let activeAlert = null;

export const setAlert = ({ message, type, duration }) => {
  if (activeAlert) {
    clearTimeout(activeAlert);
  }

  return async (dispatch) => {
    activeAlert = setTimeout(() => {
      dispatch({
        type: "REMOVE_ALERT",
        payload: {
          message: null,
        },
      });

      activeAlert = null;
    }, duration * 1000);

    dispatch({
      type: "SET_ALERT",
      payload: {
        message: message,
        type: type,
      },
    });
  };
};

const alertReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return (state = action.payload);
    case "REMOVE_ALERT":
      return (state = action.payload);
    default:
      return state;
  }
};

export default alertReducer;
