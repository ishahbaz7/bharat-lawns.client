import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const postLogin = (credentials) => {
  return api.post("/account/login", credentials).then((res) => res.data);
};

export const postRegister = (credentials) => {
  return api.post("/account/register", credentials).then((res) => res.data);
};
