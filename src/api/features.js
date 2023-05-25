import { pagerInit } from "@/hooks/usePagination";
import axios, { getAuthToken } from "./axios";

export const getFeatures = (pager = pagerInit) => {
  return axios
    .post(`/feature/get-all`, pager, { headers: getAuthToken() })
    .then((res) => res.data);
};

export const getFunctionTypes = (pager = pagerInit) => {
  return axios
    .post("/functionType/get-all", pager, { headers: getAuthToken() })
    .then((res) => res.data);
};

export const getProgramTypes = (pager = pagerInit) => {
  return axios
    .post("/programType/get-all", pager, { headers: getAuthToken() })
    .then((res) => res.data);
};
