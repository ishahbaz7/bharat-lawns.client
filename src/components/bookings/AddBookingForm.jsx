import { Fragment, useState } from "react";
import {
  Button,
  Input,
  Checkbox,
  Card,
  CardBody,
  Typography,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Modal from "@/widgets/share/Modal";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function AddBookingForm({ open, handler }) {
  const [form, setForm] = useState({});
  const [newFeature, setNewFeature] = useState("");
  const formInput = [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Mobile No",
      id: "mobileNo",
    },
    {
      label: "Amount",
      id: "amount",
    },
    {
      label: "Advance",
      id: "advance",
    },
    {
      label: "Balance",
      id: "balance",
    },
    { label: "Net Amount", id: "netAmount" },
  ];
  const [checkbox, setCheckBox] = useState([
    { label: "Stage Decoration", id: "stageDecoration" },
    { label: "Anjuman", id: "anjuman" },
    { label: "Mandap", id: "mandap" },
    { label: "Entry", id: "entry" },
    { label: "Chowrie", id: "chowrie" },
    { label: "Catering Service", id: "cateringService" },
  ]);

  return (
    <Modal open={open}>
      <Card className="mx-auto max-w-5xl">
        <CardBody>
          <Typography variant="h3" className="mb-4">
            Add Booking
          </Typography>
          <form className=" w-full" action="">
            <div className="flex flex-wrap justify-center gap-4 lg:justify-between">
              {formInput.map(({ label, id }) => {
                return (
                  <div key={id} className="w-full max-w-[30rem]">
                    <Input
                      onChange={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          [id]: e.target.value,
                        }));
                      }}
                      size="lg"
                      className="w-full"
                      label={label}
                      id={id}
                    />
                  </div>
                );
              })}

              <div>
                <div className="font-semibold">Check Features</div>

                <div className="flex flex-wrap gap-4">
                  {checkbox.map(({ id, label }) => {
                    return (
                      <div key={id}>
                        <Checkbox
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              [id]: e.target.checked,
                            }));
                          }}
                          id={id}
                          label={label}
                        />
                      </div>
                    );
                  })}
                  <Tooltip content={"Add more item"}>
                    <IconButton
                     variant="text">
                      <AiOutlinePlusCircle size={30} />
                    </IconButton>
                  </Tooltip>
                </div>
                {/* <div className="mr-2 mt-3 inline-block max-w-[16rem]">
                  <Input
                    value={newFeature || ""}
                    onChange={(e) => setNewFeature(e.target.value)}
                    label="Add features"
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={() => {
                    setCheckBox((prev) => [
                      ...prev,
                      { label: newFeature, id: newFeature },
                    ]);
                    setNewFeature("");
                  }}
                >
                  Add
                </Button> */}
              </div>
            </div>
          </form>
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button
            variant="text"
            color="red"
            onClick={() => handler(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={() => handleOpen(null)}>
            <span>Submit</span>
          </Button>
        </CardFooter>
      </Card>
    </Modal>
  );
}
