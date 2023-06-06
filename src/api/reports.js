import axios, { getAuthToken } from "./axios";

export const getMonthlyReports = (month, pager) => {
  return axios
    .post(`reports/month/${month}`, pager, {
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
