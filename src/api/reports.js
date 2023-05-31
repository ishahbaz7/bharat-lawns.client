import axios, { getAuthToken } from "./axios";

export const getMonthlyReports = (month, year) => {
  return axios
    .get(`reports/month/${month}/${year}`, {
      headers: {
        Authorization: getAuthToken(),
      },
    })
    .then((res) => res.data);
};
export const getYearlyReports = (year) => {
  return axios
    .get(`reports/year/${year}`, {
      headers: {
        Authorization: getAuthToken(),
      },
    })
    .then((res) => res.data);
};
