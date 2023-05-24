import { pagerInit } from "@/hooks/usePagination";
import axios from "./axios";

export const getFeatures = (pager = pagerInit) => {
  return axios.post(`/feature/get-all`, pager).then((res) => res.data);
};
