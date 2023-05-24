import TableCard from "@/widgets/cards/TableCard";
import { Button, Chip, IconButton, Tooltip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiEdit, BiTrash } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import AddBookingForm from "@/components/bookings/AddBookingForm";
import ViewBooking from "@/components/bookings/ViewBooking";
import Swal from "sweetalert2";
import useBookings from "@/hooks/useBookings";
import WhiteSearchInput from "@/widgets/share/WhiteSearchInput";
export function Bookings() {
  const { getBookings, cancelBooking, deleteBooking } = useBookings();
  const [addBookingModal, setAddBookingModal] = useState(false);
  const [viewBooking, setViewBooking] = useState(false);
  const [booking, setBooking] = useState({});
  const [editMode, setEditMode] = useState(false);
  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "Function Date", width:"180px", selector: (row) => row.functionDate },
    { name: "Mobile No", selector: (row) => row.mobileNo },
    { name: "Amount", selector: (row) => row.amount },
    { name: "Advance", selector: (row) => row.advance },
    { name: "Balance", selector: (row) => row.balance },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <Chip
          color={handleStatus(row.status)}
          value={handleStatusVal(row.status)}
        />
      ),
    },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (row) => (
        <div className="text-xs font-semibold text-blue-gray-600">
          <Tooltip content="Cancel booking">
            <IconButton
              disabled={row.status == 2}
              onClick={() => handleCancel(row.id)}
              variant="text"
            >
              <MdOutlineCancel color="orange" size={25} />
            </IconButton>
          </Tooltip>
          <Tooltip content="View">
            <IconButton
              onClick={() => {
                setBooking(bookings.find((val) => val.id == row.id));
                setViewBooking(true);
              }}
              variant="text"
            >
              <AiFillEye size={25} />
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
          <Tooltip content="Delete">
            <IconButton
              disabled={row.status == 2}
              onClick={() => handleDelete(row.id)}
              variant="text"
            >
              <BiTrash color="red" size={25} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings().then((data) => {
      if (data.success) {
        setBookings(data.bookings);
        console.log(data.bookings);
      }
    });
  }, []);
  const handleEdit = (id) => {
    console.log(id);
    setEditMode(true);
    setBooking(bookings.find((i) => i.id == id));
    setAddBookingModal(true);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this booking",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBooking(id).then((res) => {
          if (res.success) {
            setBookings((prev) => prev.filter((x) => x.id != id));
          }
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
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
        cancelBooking(id).then((res) => {
          if (res.success) {
            Swal.fire("Success!", "Booking Cancelled.", "success");
            setBookings((prev) =>
              prev.map((val) => {
                if (val.id == id) {
                  return { ...val, status: 1 };
                }
                return val;
              })
            );
          } else {
            Swal.fire("Error!", "Something went wrong.", "error");
          }
        });
      }
    });
  };
  const handleStatus = (status) => {
    switch (status) {
      case 0:
        return "yellow";
      case 1:
        return "red";
      case 2:
        return "green";
    }
  };
  
  const handleStatusVal = (status) => {
    switch (status) {
      case 0:
        return "Active";
      case 1:
        return "Cancelled";
      case 2:
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
                // handleChange={(e) =>
                //   e && setPagination((p) => ({ ...p, query: e.current?.value }))
                // }
                // onClear={(inp) => {
                //   setPagination((p) => ({ ...p, query: "" }));
                //   inp.current.value = "";
                // }}
                // value={pagination.query || ""}
              />
            </div>
            <div>
              <Button
                onClick={ () => {
        setBooking({
          stageDecoration: false,
          anjuman: false,
          mandap: false,
          entry: false,
          chowrie: false,
          cateringService: false,
        });
        setAddBookingModal(true);
        setEditMode(false);
      }}
                className="bg-secondary w-full"
              >
                New Booking
              </Button>
            </div>
          </div>
        
       
    }
    >
      <DataTable persistTableHead
        pagination
        highlightOnHover
        data={bookings}
        columns={columns}
      />
      {addBookingModal && (
        <AddBookingForm
          bookingsHandler={setBookings}
          handler={setAddBookingModal}
          open={addBookingModal}
          booking={booking}
          editMode={editMode}
        />
      )}
      <ViewBooking
        booking={booking}
        open={viewBooking}
        handler={setViewBooking}
      />
    </TableCard>
  );
}

export default Bookings;
