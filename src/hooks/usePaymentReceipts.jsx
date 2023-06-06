import dayjs from "dayjs";
import { Tooltip, IconButton } from "@material-tailwind/react";
import { AiOutlinePrinter } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const usePaymentReceipts = () => {
  const navigate = useNavigate();
  const getColumns = () => [
    {
      name: "Receipt No",
      selector: (row) => row.id,
    },
    {
      name: "Booking Id",
      selector: (row) => row.invoiceNo,
    },
    {
      name: "Date",
      selector: (row) => dayjs(row.date).format("DD MMM YYYY"),
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Payment Type",
      selector: (row) => (row.paymentType == 1 ? "Advanced" : "Partial"),
    },
    {
      name: "Print Receipt",
      cell: (row) => (
        <Tooltip content="Print Receipt">
          <IconButton
            disabled={row.status == 2}
            onClick={() => printReceipt(row.id)}
            variant="text"
          >
            <AiOutlinePrinter size={25} />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  const printReceipt = (id) => {
    window.open("/receipt/" + id, "_blank");
    // navigate("/receipt/" + id);
  };
  return { getColumns, printReceipt };
};

export default usePaymentReceipts;
