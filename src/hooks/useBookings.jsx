import { useMemo } from "react";
import dayjs from "dayjs";
import { Chip, Tooltip, IconButton } from "@material-tailwind/react";
import { MdOutlineCancel } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { mealType } from "@/components/bookings/AddBookingForm";

const handleStatus = (status) => {
  switch (status) {
    case 1:
      return "orange";
    case 2:
      return "red";
    case 3:
      return "green";
  }
};
const handleStatusVal = (status) => {
  switch (status) {
    case 1:
      return "Active";
    case 2:
      return "Cancelled";
    case 3:
      return "Done";
  }
};

const useBookings = () => {
  const getColumns = (cb) => {
    const columns = useMemo(
      () => [
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true,
          sortField: "name",
          width: "180px",
        },
        {
          name: "Function Date",
          width: "180px",
          selector: (row) => dayjs(row.functionDate).format("DD MMM YYYY"),
          sortable: true,
          sortField: "functionDate",
        },
        {
          name: "Mobile No",
          selector: (row) => row.mobileNo,
          sortable: true,
          sortField: "mobileNo",
          width: "130px",
        },
        {
          name: "Amount",
          selector: (row) => row.amount,
          sortable: true,
          sortField: "amount",
          width: "130px",
        },
        {
          name: "Advance",
          selector: (row) => row.advance,
        },
        {
          name: "Balance",
          cell: (row) =>
            row.balance > 0 ? (
              <div
                onClick={() => cb("pendingBalance", row.id)}
                className={"cursor-pointer text-red-500"}
              >
                {row.balance}
              </div>
            ) : (
              0
            ),
          sortable: true,
          sortField: "balance",
          width: "130px",
        },
        {
          name: "Status",
          selector: (row) => row.status,
          width: "130px",
          cell: (row) => (
            <Chip
              color={handleStatus(row.status)}
              value={handleStatusVal(row.status)}
            />
          ),
        },
        {
          name: "Features",
          selector: (row) => row?.features?.map((f) => f.name).join(", "),
          width: "280px",
        },
        {
          name: "Program Time",
          selector: (row) => row?.programTypes?.name,
          sortable: true,
          sortField: "programTypes.name",
          width: "160px",
        },
        {
          name: "Meal Type",
          selector: (row) =>
            mealType.find((m) => m.value == row?.mealType)?.label,
          sortable: true,
          sortField: "mealType",
          width: "130px",
        },
        {
          name: "Function Type",
          selector: (row) => row?.functionTypes?.name,
          sortable: true,
          sortField: "functionTypes.name",
          width: "160px",
        },
        {
          name: "Action",
          selector: (row) => row.action,
          width: "170px",
          cell: (row) => (
            <div className="text-xs font-semibold text-blue-gray-600">
              <Tooltip content="Cancel booking">
                <IconButton
                  disabled={row.status == 2}
                  onClick={() => cb("cancel", row.id)}
                  variant="text"
                >
                  <MdOutlineCancel color="red" size={25} />
                </IconButton>
              </Tooltip>
              <Tooltip content="Edit">
                <IconButton
                  disabled={row.status == 2}
                  onClick={() => cb("edit", row.id)}
                  variant="text"
                >
                  <BiEdit color="green" size={25} />
                </IconButton>
              </Tooltip>
            </div>
          ),
        },
      ],
      []
    );
    return columns;
  };
  return { getColumns };
};

export default useBookings;