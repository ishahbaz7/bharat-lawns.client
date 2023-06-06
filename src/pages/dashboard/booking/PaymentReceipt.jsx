import { getReceipts } from "@/api/booking";
import usePaymentReceipts from "@/hooks/usePaymentReceipts";
import Loading from "@/components/shared/Loading";
import TableCard from "@/widgets/cards/TableCard";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
const PaymentReceipts = () => {
  const [loading, setLoading] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const { id } = useParams();
  const { getColumns } = usePaymentReceipts();
  const columns = useMemo(() => getColumns(), []);
  useEffect(() => {
    setLoading(true);
    getReceipts(id)
      .then((res) => {
        setReceipts(res);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <TableCard title={"Payment Receipts"}>
      <DataTable
        progressComponent={<Loading />}
        pointerOnHover
        progressPending={loading}
        persistTableHead
        pagination
        highlightOnHover
        data={receipts}
        columns={columns}
      />
    </TableCard>
  );
};

export default PaymentReceipts;
