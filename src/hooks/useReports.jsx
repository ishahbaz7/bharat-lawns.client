import dayjs from "dayjs";
import { useMemo } from "react";

const useReports = () => {
  const getColumns = (cb) => {
    const columns = useMemo(
      () => [
        {
          name: "Month",
          cell: (row) => row.date && dayjs(row.date).format("MMM YYYY"),
        },
        {
          name: "Total Collection",
          selector: (row) => row.collection,
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
