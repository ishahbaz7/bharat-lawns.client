import axios, { getAuthToken } from "./axios";

export const getMonthlyReports = (month, pager) => {
  console.log("Auth token", getAuthToken());
  return axios
    .post(`reports/month/${month}`, pager, {
      headers: getAuthToken(),
    })
    .then((res) => res.data);
};
export const getYearlyReports = (year) => {
  return axios
    .get(`reports/year/${year}`, {
      headers: getAuthToken(),
    })
    .then((res) => res.data);
};
