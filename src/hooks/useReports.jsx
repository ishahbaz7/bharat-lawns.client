import dayjs from "dayjs";
import { useMemo } from "react";

export const properties = [
  "date",
  "bookingsValue",
  "collection",
  "pendingAmount",
  "bookings",
  "morning",
  "evening",
  "fullDay",
];
export const reportColumnName = [
  "Date",
  "Actual Booking Amount",
  "Total Received",
  "Pending Amount",
  "Total Bookings",
  "Morning Bookings",
  "Evening Bookings",
  "Full Day Bookings",
];

const useReports = () => {
  const getColumns = (cb) => {
    const columns = useMemo(
      () => [
        {
          name: "Date",
          cell: (row) => row.date && dayjs(row.date).format("DD MMM YYYY"),
          width: "130px",
        },
        {
          name: "Actual Booking Amount",
          selector: (row) => row.bookingsValue,
          width: "150px",
        },
        {
          name: "Total Received Amount",
          selector: (row) => row.collection,
          width: "140px",
        },
        {
          name: "Pending Amount",
          selector: (row) => row.pendingAmount,
        },
        {
          name: "Total Bookings",
          selector: (row) => row.bookings,
        },
        {
          name: "Morning Bookings",
          selector: (row) => row.morning,
        },
        {
          name: "Evening Bookings",
          selector: (row) => row.evening,
        },
        {
          name: "Full Day Bookings",
          selector: (row) => row.fullDay,
        },
      ],
      []
    );

    return columns;
  };

  return { getColumns };
};

export default useReports;
