import axios from "axios";
const baseUrl = "/api/login";

const logIn = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

const loginService = {
  logIn,
};

export default loginService;
