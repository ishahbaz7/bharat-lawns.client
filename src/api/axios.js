import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export const getAuthToken = () => {
  return { Authorization: `Bearer ${cookie.get("user")?.token}` };
};

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      cookie.remove("user");
    }
    return Promise.reject(error);
  }
);
