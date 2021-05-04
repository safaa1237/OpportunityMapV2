import axios from "axios";
import logger from "./logService";

axios.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.success) {
      return data.payload;
    } else {
      throw new Error("api request error");
    }
  },
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      logger.log(error);
      alert("An unexpected error occurrred.");
    }

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
};
