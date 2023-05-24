import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Checkbox,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import Modal from "@/widgets/share/Modal";
import useBookings from "@/hooks/useBookings";
import AsyncSelect from "react-select/async";
import { getFeatures } from "@/api/features";
import { pagerInit } from "@/hooks/usePagination";

export default function AddBookingForm({
  open,
  handler,
  bookingsHandler,
  booking,
  editMode,
}) {
  const { postBooking, putBooking } = useBookings();
  const [form, setForm] = useState({});
  useEffect(() => {
    console.log("rendered");
  }, []);
  useEffect(() => {
    setForm(booking);
  }, [booking]);
  const formInput = [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Mobile No",
      id: "mobileNo",
      type: "number",
    },
    {
      label: "Amount",
      id: "amount",
      type: "number",
    },
    {
      label: "Advance",
      id: "advance",
      type: "number",
    },
    {
      label: "Balance",
      id: "balance",
      type: "number",
    },
    { label: "Function Date", id: "functionDate", type: "date" },
  ];
  const [checkbox, setCheckBox] = useState([
    { label: "Stage Decoration", id: "stageDecoration" },
    { label: "Anjuman", id: "anjuman" },
    { label: "Mandap", id: "mandap" },
    { label: "Entry", id: "entry" },
    { label: "Chowrie", id: "chowrie" },
    { label: "Catering Service", id: "cateringService" },
  ]);

  const selectBox = [
    {
      id: "programTimings",
      label: "Program Timings",
      options: ["Morning", "Evening", "Full Day"],
    },
    {
      id: "mealType",
      label: "Meal Type",
      options: ["Veg", "Non-Veg"],
    },
    {
      id: "functionType",
      label: "Function Type",
      options: [
        "Shadi",
        "Walima",
        "Haqeeqa",
        "Haldi Mahedi",
        "Marashtrian Shaadi",
        "Company Function",
        "School Program",
        "Cultural Program",
        "Etc.",
      ],
    },
  ];

  const [features, setFeatures] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    var arr = [];
    getFeatures({ ...pagerInit, query: "" }).then((data) => {
      data?.data?.map((v) => v.id && arr.push({ label: v.name, value: v }));
      console.log("data",arr);
      setFeatures(arr);
    });
  }, []);
  //select options from remote
  const loadOptions = async (
    inputValue,
    callback
  ) => {
    var arr = [];
    var data = await getFeatures({ ...pagerInit, query: inputValue });
    data.data.map((v) => v.id && arr.push({ label: v.name, value: v }));
    callback(arr);
  };

  const handleSelectType = (fieldName, value) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      putBooking(form).then((res) => {
        if (res.success) {
          bookingsHandler((prev) =>
            prev.map((val) => {
              if (val.id == form.id) {
                return res.data;
              }
              return val;
            })
          );
          setForm({});
          handler(false);
        }
      });
    } else {
      postBooking(form).then((data) => {
        if (data.success) {
          console.log(data.data);
          bookingsHandler((prev) => [data.data, ...prev]);
          setForm({});
          handler(false);
        }
      });
    }
  };
  return (
    <Modal open={open} title={editMode ? "Update" : "Add" + " Booking" } handleModal={handler} size={"1100px"}>
    
          <form onSubmit={handleSubmit} className=" w-full" action="#">
            <div className="flex flex-wrap justify-center gap-4 lg:justify-between">
              {formInput.map(({ label, id, type }) => {
                return (
                  <div key={id} className="w-full max-w-[30rem]">
                    <Input
                      type={type || "text"}
                      value={[form[id]] || ""}
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
              <div className="w-full 2xl:max-w-[25rem]">
              <AsyncSelect placeholder="Select Features"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    height: "40px",
                    borderRadius: "7px",
                    border: errors?.bmsMasterId && "red 1.5px solid",
                  }),
                }}
                onChange={(e) => {
                  if (e?.value) {
                    // setBmsMaster(e.value);
                    // setAddBmsForm(
                    //   (p) => ({ ...p, bmsMasterId: e?.value.id })
                    // );
                  }
                }}
                loadOptions={loadOptions}
                defaultOptions={features}
              />
            </div>
              <div>
                <div className="font-semibold">Features</div>

                <div className="flex flex-wrap gap-4">
                  {checkbox.map(({ id, label }) => {
                    // console.log(id, form[id]);
                    // console.log("form", form[id]);
                    return (
                      <div key={id}>
                        <Checkbox
                          defaultChecked={form[id]}
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
                </div>
              </div>
              <div className="w-full max-w-[30rem]">
                <Input
                  size="lg"
                  value={form?.otherFeatures || ""}
                  label="Other Features"
                  id="otherFeatures"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      otherFeatures: e.target.value,
                    }))
                  }
                />
              </div>
              {selectBox.map((val) => {
                return (
                  <div key={val.id} className="w-full max-w-[30rem]">
                    <Select
                      value={form[val.id]}
                      size="lg"
                      onChange={(e) => handleSelectType(val.id, e)}
                      label={val.label}
                      className="w-full"
                    >
                      {val.options.map((opt, i) => {
                        return (
                          <Option key={opt} value={i.toString()}>
                            {opt}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                );
              })}
            </div>
            <div className="mt-7 flex justify-end">
              <Button
                variant="text"
                color="red"
                onClick={() => handler(false)}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button type="submit" variant="gradient">
                <span>{editMode ? "Update" : "Add"}</span>
              </Button>
            </div>
          </form>
        
    </Modal>
  );
}
