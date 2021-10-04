import axios from "axios";
const baseUrl = "/api/blogs";

// set user token
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data.sort((i, j) => j.likes - i.likes);
};

const createNewBlog = async (newBlogObj) => {
  // console.log(token)

  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlogObj, config);
  return response.data;
};

const updateBlog = async (id, updatedBlogObj) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlogObj, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const addComment = async (id, newCommentObj) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${baseUrl}/${id}/comments`, newCommentObj, config);
  return response.data;
};

const blogService = {
  setToken,
  getBlogs,
  createNewBlog,
  updateBlog,
  deleteBlog,
  addComment,
};

export default blogService;
