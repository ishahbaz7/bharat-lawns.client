import TableCard from "@/widgets/cards/TableCard";
import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddBookingForm from "@/components/bookings/AddBookingForm";
import Swal from "sweetalert2";
import WhiteSearchInput from "@/widgets/share/WhiteSearchInput";
import { getBookings, cancelBooking } from "@/api/booking";
import dayjs from "dayjs";
import Loading from "@/components/shared/Loading";
import usePagination, { pagerInit } from "@/hooks/usePagination";
import { useParams } from "react-router-dom";
import useBookings from "@/hooks/useBookings";
import PendingBalance from "@/components/bookings/PendingBalance";

export function Bookings() {
  const [addBookingModal, setAddBookingModal] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [pendingBalanceModal, setPendingBalanceModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [pager, setPager] = useState(pagerInit);
  const [bookings, setBookings] = useState([]);
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const { handleDataTableSort, handlePageChange, handlePerRowsChange } =
    usePagination(setPager);
  const { getColumns } = useBookings();

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
    getBookings(pager, month)
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
  ]);

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
      <div className="my-2 flex w-full max-w-sm">
        <Input
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          label="Select Month"
          type="month"
          className="w-full"
        />
      </div>
      <DataTable
        progressComponent={<Loading />}
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
      {pendingBalanceModal && bookingId && (
        <PendingBalance
          bookingId={bookingId}
          open={pendingBalanceModal}
          handleModal={setPendingBalanceModal}
          onSubmit={(balance, id) => {
            let filtered = bookings.map((x) => {
              if (x.id == id) {
                console.log({ ...x, balance: x.balance - balance });
                return { ...x, balance: x.balance - balance };
              } else {
                return x;
              }
            });
            console.log(filtered);
            setBookings(filtered);
          }}
        />
      )}
    </TableCard>
  );
}

export default Bookings;
