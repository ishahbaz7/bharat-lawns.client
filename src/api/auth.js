import axios from "./axios";

export const postLogin = (credentials) => {
  return axios.post("/account/login", credentials).then((res) => res.data);
};

export const postRegister = (credentials) => {
  return axios.post("/account/register", credentials).then((res) => res.data);
};
