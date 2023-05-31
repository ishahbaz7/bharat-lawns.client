import TableCard from "@/widgets/cards/TableCard";
import DataTable from "react-data-table-component";
import useReports from "@/hooks/useReports";
import { getYearlyReports } from "@/api/reports";
import { useEffect, useState } from "react";
import Select from "react-select";
import dayjs from "dayjs";
import { getYears } from "@/utility/helper";
import Loading from "@/components/shared/Loading";

const years = getYears(2022).map((x) => ({ value: x, label: x }));
const Reports = () => {
  const [reports, setReports] = useState([]);
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const { getColumns } = useReports();
  const [loading, setLoading] = useState(false);

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
    <TableCard title={"Reports"}>
      <div className=" mx-5 my-2 max-w-sm">
        <Select
          onChange={(e) => setYear(e.value)}
          value={years.find((x) => x.value == year)}
          className="w-full"
          options={years}
        />
      </div>
      <DataTable
        progressComponent={<Loading />}
        progressPending={loading}
        columns={getColumns()}
        data={reports}
        persistTableHead
      />
    </TableCard>
  );
};

export default Reports;
