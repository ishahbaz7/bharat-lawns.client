import { getBooking } from "@/api/booking";
import Modal from "@/widgets/share/Modal";
import { Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import Loading from "../shared/Loading";
import dayjs from "dayjs";

const classes = "p-4 border-b border-blue-gray-50";
const EventView = ({ open, handler, id }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBooking(id)
      .then((b) => {
        setBooking(b);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);
  const [booking, setBooking] = useState({});
  return (
    <>
      {loading && <Loading />}
      <Modal
        size={"400px"}
        open={open}
        handleModal={handler}
        title={"Booking Details"}
      >
        <table className="w-full min-w-max table-auto  border-2 text-left">
          <tbody>
            <tr>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  Name
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {booking?.name}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  Mobile No
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {booking?.mobileNo}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  Function Date
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {dayjs(booking?.functionDate).format("DD MMM YYYY")}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  Program Time
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {booking?.programTypes?.name}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  Amount
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {booking?.amount}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  Advanced
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {booking?.advance}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  Balance
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {booking?.balance}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </>
  );
};

export default EventView;
