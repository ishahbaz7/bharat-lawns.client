import TableCard from "@/widgets/cards/TableCard";
import DataTable from "react-data-table-component";
import useReports, { properties, reportColumnName } from "@/hooks/useReports";
import { getYearlyReports } from "@/api/reports";
import { useEffect, useState } from "react";
import Select from "react-select";
import dayjs from "dayjs";
import { exportExcel, getYears } from "@/utility/helper";
import Loading from "@/components/shared/Loading";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const years = getYears(2022).map((x) => ({ value: x, label: x }));
export const YearlyReport = () => {
  const [reports, setReports] = useState([]);
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const { getColumns } = useReports();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getYearlyReports(year)
      .then((reports) => {
        setLoading(false);
        setReports(reports);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [year]);
  return (
    <TableCard title={"Yearly Booking Report"}>
      <div className="m-2 flex justify-between">
        <div className="w-full max-w-[10rem]">
          <Select
            onChange={(e) => setYear(e.value)}
            value={years.find((x) => x.value == year)}
            className="w-full"
            options={years}
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
        onRowClicked={(row) =>
          navigate(
            "/admin/monthly-bookings?month=" +
              dayjs(row.date).format("YYYY-MM-DD")
          )
        }
        progressComponent={<Loading />}
        progressPending={loading}
        columns={getColumns()}
        data={reports}
        persistTableHead
      />
    </TableCard>
  );
};
