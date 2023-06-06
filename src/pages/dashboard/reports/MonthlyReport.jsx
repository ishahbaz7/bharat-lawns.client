import TableCard from "@/widgets/cards/TableCard";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getBookings } from "@/api/booking";
import dayjs from "dayjs";
import Loading from "@/components/shared/Loading";
import usePagination, { pagerInit } from "@/hooks/usePagination";
import DatePicker from "react-datepicker";
import useReports, { properties, reportColumnName } from "@/hooks/useReports";
import { getMonthlyReports } from "@/api/reports";
import { Button } from "@material-tailwind/react";
import { exportExcel } from "@/utility/helper";

export function MonthlyReport() {
  const [loading, setLoading] = useState(false);
  const [pager, setPager] = useState(pagerInit);
  const [reports, setReports] = useState([]);
  const [month, setMonth] = useState(new Date());
  const { handleDataTableSort, handlePageChange, handlePerRowsChange } =
    usePagination(setPager);
  const { getColumns } = useReports();

  //get bookings on page load
  useEffect(() => {
    setLoading(true);
    getMonthlyReports(dayjs(month).format("YYYY-MM"), pager)
      .then((data) => {
        setLoading(false);
        setReports(data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [
    pager.query,
    pager.perPage,
    pager.page,
    pager.sort,
    pager.sortDir,
    month,
  ]);

  return (
    <TableCard title={"Monthly Booking Report"} className={"mt-10"}>
      <div className="m-2 flex justify-between">
        <div className="w-full max-w-[10rem]">
          {" "}
          <DatePicker
            placeholderText="Select Month"
            dateFormat="MMM yyyy"
            selected={month}
            onChange={(val) => setMonth(val)}
            className={
              "h-10 w-full rounded-md border border-blue-gray-200 px-2"
            }
            showMonthYearPicker
          />
        </div>
        <div>
          <Button
            onClick={() =>
              exportExcel(reports, properties, {
                fileName: "monthly-report",
                columns: reportColumnName,
              })
            }
          >
            Export to Excel
          </Button>
        </div>
      </div>
      <DataTable
        progressComponent={<Loading />}
        progressPending={loading}
        persistTableHead
        pagination
        highlightOnHover
        data={reports}
        columns={getColumns()}
        paginationServer
        paginationTotalRows={pager.count}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        defaultSortAsc={false}
        onSort={handleDataTableSort}
        sortServer
      />
    </TableCard>
  );
}

export default MonthlyReport;
