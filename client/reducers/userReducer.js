export const setUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return (state = action.payload);
    default:
      return state;
  }
};

export default userReducer;
