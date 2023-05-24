import Modal from "@/widgets/share/Modal";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";

function ViewBooking({ booking, open, handler }) {
  useEffect(() => {
    console.log(booking);
  }, [booking]);
  return (
    <Modal open={open}>
      <Card className="mx-auto min-w-[900px] max-w-5xl">
        <CardBody>
          <Typography variant="h3" className="mv-4">
            Booking Details
          </Typography>

          <div className="mt-5 flex justify-end">
            <Button variant="text" color="red" onClick={() => handler(false)}>
              Close
            </Button>
          </div>
        </CardBody>
      </Card>
    </Modal>
  );
}

export default ViewBooking;
