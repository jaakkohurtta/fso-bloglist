import blogService from "../services/blogs";

export const getBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getBlogs();
      // console.log(blogs)
      dispatch({
        type: "GET_BLOGS",
        payload: blogs,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createNewBlog(blog);
      dispatch({
        type: "CREATE_NEW_BLOG",
        payload: newBlog,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id);
      dispatch({
        type: "DELETE_BLOG",
        payload: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const likeBlog = (id, likedBlog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.updateBlog(id, likedBlog);
      dispatch({
        type: "LIKE_BLOG",
        payload: response,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.addComment(id, comment);
      dispatch({
        type: "NEW_COMMENT",
        payload: updatedBlog,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_BLOGS":
      return (state = action.payload);

    case "CREATE_NEW_BLOG":
      return state.concat(action.payload);

    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.payload.id);

    case "LIKE_BLOG":
      return state.map((blog) => (blog.id !== action.payload.id ? blog : action.payload));

    case "NEW_COMMENT":
      return state.map((blog) => (blog.id !== action.payload.id ? blog : action.payload));

    default:
      return state;
  }
};

export default blogsReducer;
