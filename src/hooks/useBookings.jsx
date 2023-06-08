import { useMemo, useEffect } from "react";
import dayjs from "dayjs";
import { Chip, Tooltip, IconButton } from "@material-tailwind/react";
import { MdOutlineCancel, MdOutlineVisibility } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { mealType } from "@/components/bookings/AddBookingForm";
import { GiWallet } from "react-icons/gi";
import useAuth from "./useAuth";
import roles from "@/roles";
import useScreenSize from "./useScreenSize";

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
  const { isInRole } = useAuth();
  const sz = useScreenSize();
  useEffect(() => {
    console.log(sz.width);
  }, [sz]);
  const getColumns = (cb) => {
    const columns = useMemo(
      () => [
        {
          name: "Booking Id",
          selector: (row) => row.invoiceNo,

          width: "110px",
          omit: sz.width <= 500,
        },
        {
          name: "Booking Date",
          width: "150px",
          selector: (row) => dayjs(row.createdAt).format("DD MMM YYYY"),
          sortable: true,
          sortField: "createdAt",
          omit: sz.width <= 500,
        },
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true,
          sortField: "name",
          width: sz.width <= 500 ? "130px" : "180px",
        },

        {
          name: "Function Date",
          width: sz.width <= 500 ? "125px" : "160px",
          selector: (row) => dayjs(row.functionDate).format("DD MMM YYYY"),
          sortable: true,
          sortField: "functionDate",
        },
        {
          name: "Mobile No",
          selector: (row) => row.mobileNo,
          sortable: true,
          sortField: "mobileNo",
          width: sz.width <= 500 ? "110px" : "130px",
        },
        {
          name: "Amount",
          selector: (row) => row.amount,
          sortable: true,
          sortField: "amount",
          width: "130px",
          omit: sz.width <= 500,
        },
        {
          name: "Advance",
          selector: (row) => row.advance,
          omit: sz.width <= 500,
        },
        {
          name: "Balance",
          cell: (row) =>
            row.balance > 0 && row.status != 2 ? (
              <Tooltip content={"Collect Pending Balance"}>
                <div
                  onClick={() =>
                    !isInRole(roles.report) && cb("pendingBalance", row.id)
                  }
                  className={"flex cursor-pointer gap-3 text-red-500"}
                >
                  {row.balance} <GiWallet size={20} color="green" />
                </div>
              </Tooltip>
            ) : (
              0
            ),
          sortable: true,
          sortField: "balance",
          width: sz.width <= 500 ? "110px" : "130px",
        },
        {
          name: "Paid",
          cell: (row) => row.amount - row.balance,
          omit: sz.width <= 500,
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
          omit: sz.width <= 500,
        },
        {
          name: "Features",
          selector: (row) => row?.features?.map((f) => f.name).join(", "),
          width: "280px",
          omit: sz.width <= 500,
        },
        {
          name: "Other Features",
          selector: (row) => row?.otherFeatures,
          width: "140px",
          omit: sz.width <= 500,
        },
        {
          name: "Program Time",
          selector: (row) => row?.programTypes?.name,
          sortable: true,
          sortField: "programTypes.name",
          width: sz.width <= 500 ? "130px" : "160px",
        },
        {
          name: "Meal Type",
          selector: (row) =>
            mealType.find((m) => m.value == row?.mealType)?.label,
          sortable: true,
          sortField: "mealType",
          width: "130px",
          omit: sz.width <= 500,
        },
        {
          name: "Function Type",
          selector: (row) => row?.functionTypes?.name,
          sortable: true,
          sortField: "functionTypes.name",
          width: "160px",
          omit: sz.width <= 500,
        },
        {
          name: "Action",
          omit: isInRole(roles.report),
          selector: (row) => row.action,
          width: "170px",
          cell: (row) => (
            <div className={"text-xs font-semibold text-blue-gray-600"}>
              {sz.width <= 500 && (
                <Tooltip content="View booking details">
                  <IconButton onClick={() => cb("view", row.id)} variant="text">
                    <MdOutlineVisibility size={25} />
                  </IconButton>
                </Tooltip>
              )}
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
                  disabled={
                    row.status == 2 || dayjs().isAfter(row.functionDate)
                  }
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
      [sz.width]
    );
    return columns;
  };
  return { getColumns };
};

export default useBookings;
