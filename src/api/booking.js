import { pagerInit } from "@/hooks/usePagination";
import axios, { getAuthToken } from "./axios";
import dayjs from "dayjs";

export const postBooking = (booking) => {
  return axios
    .post("/booking", booking, { headers: getAuthToken() })
    .then((res) => res.data);
};

export const getBookings = (pager = pagerInit, type, month) => {
  return axios
    .post(
      `/booking/get-all/${
        type == "monthly"
          ? "?month=" + month
          : type == "pending"
          ? "?pending=true"
          : ""
      }`,
      pager,
      {
        headers: getAuthToken(),
      }
    )
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

export const getReceipts = (bookingId) => {
  return axios
    .get("/booking/get-receipts/" + bookingId, { headers: getAuthToken() })
    .then((res) => res.data);
};

export const getPrintReceipt = (receiptId) => {
  return axios
    .get("/booking/print-receipt/" + receiptId, { headers: getAuthToken() })
    .then((res) => res.data);
};
