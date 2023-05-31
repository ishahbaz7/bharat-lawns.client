import { pagerInit } from "@/hooks/usePagination";
import axios, { getAuthToken } from "./axios";
import dayjs from "dayjs";

export const postBooking = (booking) => {
  return axios
    .post("/booking", booking, { headers: getAuthToken() })
    .then((res) => res.data);
};

export const getBookings = (
  pager = pagerInit,
  date = dayjs().format("YYYY-MM")
) => {
  return axios
    .post("/booking/get-all/" + date, pager, { headers: getAuthToken() })
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

export const getEvents = (date) => {
  return axios
    .get("/booking/get-events/" + date, { headers: getAuthToken() })
    .then((res) => res.data);
};

export const postPendingBalance = (id, amount) => {
  return axios
    .post(
      `/booking/pending-balance/${id}/${amount || 0}`,
      {},
      { headers: getAuthToken() }
    )
    .then((res) => res.data);
};
