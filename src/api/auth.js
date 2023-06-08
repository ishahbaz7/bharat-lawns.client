import axios from "axios";
import { getAuthToken } from "./axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const postLogin = (credentials) => {
  return api.post("/account/login", credentials).then((res) => res.data);
};

export const postRegister = (credentials) => {
  return api.post("/account/register", credentials).then((res) => res.data);
};

export const getUser = () => {
  return api
    .get("/account/get-user", { headers: getAuthToken() })
    .then((res) => res.data);
};

export const putUser = (user) => {
  return api
    .patch("/account/update-user", user, { headers: getAuthToken() })
    .then((res) => res.data);
};
export const updatePassword = (password) => {
  return api
    .patch("/account/update-password", password, { headers: getAuthToken() })
    .then((res) => res.data);
};
