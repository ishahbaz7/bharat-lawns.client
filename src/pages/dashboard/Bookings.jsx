import TableCard from "@/widgets/cards/TableCard";
import { Button, Chip, IconButton, Tooltip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiEdit } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import AddBookingForm, { mealType } from "@/components/bookings/AddBookingForm";
import Swal from "sweetalert2";
import WhiteSearchInput from "@/widgets/share/WhiteSearchInput";
import { getBookings, cancelBooking } from "@/api/booking";
import dayjs from "dayjs";
import Loading from "@/components/shared/Loading";
import usePagination, { pagerInit } from "@/hooks/usePagination";

export function Bookings() {
  const [addBookingModal, setAddBookingModal] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pager, setPager] = useState(pagerInit);
  const { handleDataTableSort, handlePageChange, handlePerRowsChange } =
    usePagination(setPager);
  const columns = [
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
      selector: (row) => dayjs(row.functionDate).format("DD-MMM-YYYY"),
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
    },
    {
      name: "Advance",
      selector: (row) => row.advance,
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
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
      selector: (row) => mealType.find((m) => m.value == row?.mealType)?.label,
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
              onClick={() => handleCancel(row.id)}
              variant="text"
            >
              <MdOutlineCancel color="red" size={25} />
            </IconButton>
          </Tooltip>
          <Tooltip content="Edit">
            <IconButton
              disabled={row.status == 2}
              onClick={() => handleEdit(row.id)}
              variant="text"
            >
              <BiEdit color="green" size={25} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setLoading(true);
    getBookings(pager)
      .then((data) => {
        setLoading(false);
        console.log(data);
        setBookings(data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [pager.query, pager.perPage, pager.page, pager.sort, pager.sortDir]);
  const handleEdit = (id) => {
    setBookingId(id);
    setAddBookingModal(true);
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Cancel this booking",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBooking(id)
          .then((res) => {
            Swal.fire("Success!", "Booking Cancelled.", "success");
            setBookings((prev) =>
              prev.map((val) => {
                if (val.id == id) {
                  return { ...val, status: 2 };
                }
                return val;
              })
            );
          })
          .catch((err) => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };
  const handleStatus = (status) => {
    console.log("status", status);
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
  return (
    <TableCard
      title={"Bookings"}
      className={"mt-10"}
      addBtn={
        <div className="flex w-full justify-end gap-3">
          <div className="w-full max-w-sm">
            <WhiteSearchInput
              label="Search Bookings"
              handleChange={(e) =>
                e && setPager((p) => ({ ...p, query: e.current?.value }))
              }
              onClear={(inp) => {
                setPager((p) => ({ ...p, query: "" }));
                inp.current.value = "";
              }}
              value={pager.query || ""}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                setBookingId(null);
                setAddBookingModal(true);
              }}
              className="w-full bg-secondary"
            >
              New Booking
            </Button>
          </div>
        </div>
      }
    >
      <DataTable
        progressComponent={<Loading />}
        progressPending={loading}
        persistTableHead
        pagination
        highlightOnHover
        data={bookings}
        columns={columns}
        paginationServer
        paginationTotalRows={pager.count}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        defaultSortAsc={false}
        onSort={handleDataTableSort}
        sortServer
      />
      {addBookingModal && (
        <AddBookingForm
          onSubmit={(data) =>
            bookingId
              ? setBookings((prev) =>
                  prev.map((val) => {
                    if (val.id == bookingId) {
                      return { ...val, ...data };
                    }
                    return val;
                  })
                )
              : setBookings((prev) => [data, ...prev])
          }
          handler={setAddBookingModal}
          open={addBookingModal}
          bookingId={bookingId}
        />
      )}
    </TableCard>
  );
}

export default Bookings;
