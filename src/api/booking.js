import { pagerInit } from "@/hooks/usePagination";
import axios, { getAuthToken } from "./axios";

export const postBooking = (booking) => {
  return axios
    .post("/booking", booking, { headers: getAuthToken() })
    .then((res) => res.data);
};

export const getBookings = (pager = pagerInit) => {
  return axios
    .post("/booking/get-all", pager, { headers: getAuthToken() })
    .then((res) => res.data);
};

export const getBooking = (id) => {
  return axios
    .get("/booking/" + id, { headers: getAuthToken() })
    .then((res) => res.data);
};

export const putBooking = (id, booking) => {
  return axios
    .put("/booking/" + id, booking, { headers: getAuthToken() })
    .then((res) => res.data);
};

export const cancelBooking = (id) => {
  return axios
    .put("/booking/cancel/" + id, null, { headers: getAuthToken() })
    .then((res) => res.data);
};
