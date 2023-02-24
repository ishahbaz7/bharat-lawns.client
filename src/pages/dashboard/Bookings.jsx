import TableCard from "@/widgets/cards/TableCard";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { BiEdit, BiTrash } from "react-icons/bi";
import { AiFillEye, AiOutlineEye } from "react-icons/ai";
import AddBookingForm from "@/components/bookings/AddBookingForm";
export function Bookings() {
  const [addBookingModal, setAddBookingModal] = useState(false);
  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "Mobile No", selector: (row) => row.mobileNo },
    { name: "Amount", selector: (row) => row.amount },
    { name: "Advance", selector: (row) => row.advance },
    { name: "Balance", selector: (row) => row.balance },
    { name: "Net Amount", selector: (row) => row.netAmount },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (row) => (
        <div className="text-xs font-semibold text-blue-gray-600">
          <Tooltip content="View">
            <IconButton onClick={() => handleDelete(row._id)} variant="text">
              <AiFillEye size={25} />
            </IconButton>
          </Tooltip>
          <Tooltip content="Edit">
            <IconButton onClick={() => handleEdit(row._id)} variant="text">
              <BiEdit color="green" size={25} />
            </IconButton>
          </Tooltip>
          <Tooltip content="Delete">
            <IconButton onClick={() => handleDelete(row._id)} variant="text">
              <BiTrash color="red" size={25} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "Test",
      mobileNo: "9230918893",
      amount: 35000,
      advance: 15000,
      balance: 20000,
      netAmount: 15000,
    },
  ]);

  return (
    <TableCard
      title={"Bookings"}
      className={"mt-10"}
      addClick={setAddBookingModal}
    >
      <DataTable
        pagination
        highlightOnHover
        data={bookings}
        columns={columns}
      />
      <AddBookingForm handler={setAddBookingModal} open={addBookingModal} />
    </TableCard>
  );
}

export default Bookings;
