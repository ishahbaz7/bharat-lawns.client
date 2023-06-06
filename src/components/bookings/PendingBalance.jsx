import { getBooking, postPendingBalance } from "@/api/booking";
import Modal from "@/widgets/share/Modal";
import { Input, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import Loading from "../shared/Loading";
import usePaymentReceipts from "@/hooks/usePaymentReceipts";

const PendingBalance = ({ open, handleModal, bookingId, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState({});
  const [amountError, setAmountError] = useState(null);
  const [collectedAmount, setCollectedAmount] = useState(0);
  const { printReceipt } = usePaymentReceipts();

  useEffect(() => {
    setLoading(true);
    getBooking(bookingId)
      .then((b) => {
        setBooking(b);
        setCollectedAmount(b.balance);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const handlePendingBalance = () => {
    setAmountError(null);
    setLoading(true);
    postPendingBalance(bookingId, collectedAmount)
      .then((res) => {
        console.log(res);
        setLoading(false);
        onSubmit(collectedAmount, bookingId);
        handleModal(false);
        printReceipt(res.id);
      })
      .catch((err) => {
        setLoading(false);
        setAmountError(err.response?.data?.errors);
      });
  };
  return (
    <Modal
      size="500px"
      open={open}
      handleModal={() => {
        handleModal(false);
        setAmountError({});
      }}
      title={booking.name && booking.name?.split(" ")[0] + "'s Booking"}
    >
      {loading && <Loading />}
      <Input
        error={!!amountError?.amount}
        onKeyDown={(e) => e.key == "Enter" && handlePendingBalance()}
        type="number"
        value={collectedAmount || ""}
        onChange={(e) => setCollectedAmount(parseInt(e.target.value))}
        label="Enter Collected Amount"
      />
      <span className="text-xs text-red-500">
        {amountError &&
          Array.isArray(amountError.amount) &&
          amountError.amount[0]}
      </span>
      <Button
        disabled={loading}
        onClick={handlePendingBalance}
        className="float-right mt-3"
      >
        Collect
      </Button>
    </Modal>
  );
};

export default PendingBalance;
