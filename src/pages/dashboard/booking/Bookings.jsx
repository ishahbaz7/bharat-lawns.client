import TableCard from "@/widgets/cards/TableCard";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddBookingForm from "@/components/bookings/AddBookingForm";
import Swal from "sweetalert2";
import WhiteSearchInput from "@/widgets/share/WhiteSearchInput";
import { getBookings, cancelBooking } from "@/api/booking";
import dayjs from "dayjs";
import Loading from "@/components/shared/Loading";
import usePagination, { pagerInit } from "@/hooks/usePagination";
import { useNavigate, useParams } from "react-router-dom";
import useBookings from "@/hooks/useBookings";
import PendingBalance from "@/components/bookings/PendingBalance";
import DatePicker from "react-datepicker";
import { exportExcel, getParams } from "@/utility/helper";
import useAuth from "@/hooks/useAuth";
import roles from "@/roles";
import { useMaterialTailwindController, setPager } from "@/context";

const properties = [
  "invoiceNo",
  "createdAt",
  "name",
  "functionDate",
  "mobileNo",
  "amount",
  "advance",
  "balance",
  "programTypes.name",
  "functionTypes.name",
];
const columnName = [
  "Booking Id",
  "Function Date",
  "Name",
  "Booking Date",
  "Mobile No",
  "Amount",
  "Advance",
  "Balance",
  "Program Time",
  "Function Type",
];

export function Bookings({ type }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { pager } = controller;
  const [pag, setPag] = useState(pagerInit);
  const [addBookingModal, setAddBookingModal] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [pendingBalanceModal, setPendingBalanceModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [bookings, setBookings] = useState([]);
  const { isInRole } = useAuth();
  const navigate = useNavigate();
  const { handleDataTableSort, handlePageChange, handlePerRowsChange } =
    usePagination(setPag);
  const { getColumns } = useBookings();
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    var month = getParams("month");
    if (month) setMonth(new Date(month));
  }, []);
  useEffect(() => {
    setPager(dispatch, pag);
  }, [pag]);

  //open edit modal to update booking
  const handleEdit = (id) => {
    setBookingId(id);
    setAddBookingModal(true);
  };

  //cancel booking
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
  //handle action to be performed on edit or cancel
  const handleAction = (type, id) => {
    var actions = {
      edit: handleEdit,
      cancel: handleCancel,
      pendingBalance: () => {
        setBookingId(id);
        setPendingBalanceModal(true);
      },
    };
    return actions[type](id);
  };

  //open create booking modal if user is redirected from calender
  useEffect(() => {
    if (
      (params?.fnDate != undefined || params?.fnDate != null) &&
      dayjs(params?.fnDate).isValid()
    ) {
      setAddBookingModal(true);
    }
  }, [params]);

  //get bookings on page load
  useEffect(() => {
    setLoading(true);
    getBookings(
      pager,
      type,
      type == "monthly" ? dayjs(month).format("YYYY-MM-DD") : null
    )
      .then((data) => {
        setLoading(false);
        setBookings(data.data);
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
    type,
  ]);

  return (
    <TableCard
      title={"Bookings"}
      className={"mt-10"}
      addBtn={
        <div className="flex w-full justify-end gap-3">
          <div className="hidden w-full max-w-xs md:block">
            <WhiteSearchInput
              label="Search Bookings"
              handleChange={(e) =>
                e && setPager(dispatch, { ...pager, query: e.current?.value })
              }
              onClear={(inp) => {
                setPager(dispatch, { ...pager, query: "" });
                inp.current.value = "";
              }}
              value={pager.query || ""}
            />
          </div>

          {!isInRole(roles.report) && (
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
          )}
        </div>
      }
    >
      <div className="m-2 flex justify-between">
        {type == "monthly" && (
          <div className=" flex w-full max-w-[10rem]">
            <DatePicker
              placeholderText="Select Month"
              dateFormat="MMM yyyy"
              selected={month}
              onChange={(val) => setMonth(val)}
              className={
                " h-10 w-full rounded-md border border-blue-gray-200 px-2"
              }
              showMonthYearPicker
            />
          </div>
        )}
        {type != "monthly" && <div></div>}
        <div>
          <Button
            onClick={() =>
              exportExcel(bookings, properties, {
                fileName: "bookings",
                columns: columnName,
              })
            }
          >
            Export to Excel
          </Button>
        </div>
      </div>
      <DataTable
        onRowClicked={(row) =>
          !isInRole(roles.report) &&
          navigate(`/admin/booking/${row.id}/receipts`)
        }
        progressComponent={<Loading />}
        pointerOnHover
        progressPending={loading}
        persistTableHead
        pagination
        highlightOnHover
        data={bookings}
        columns={getColumns(handleAction)}
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
                      console.log("data", data);
                      return data;
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
      {pendingBalanceModal && bookingId && (
        <PendingBalance
          bookingId={bookingId}
          open={pendingBalanceModal}
          handleModal={setPendingBalanceModal}
          onSubmit={(balance, id) => {
            let filtered = bookings.map((x) => {
              if (x.id == id) {
                return { ...x, balance: x.balance - balance };
              } else {
                return x;
              }
            });
            setBookings(filtered);
          }}
        />
      )}
    </TableCard>
  );
}

export default Bookings;
