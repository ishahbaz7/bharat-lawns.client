import { useEffect, useState } from "react";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import Modal from "@/widgets/share/Modal";
import useBookings from "@/hooks/useBookings";
import AsyncSelect from "react-select/async";
import { getFeatures, getFunctionTypes, getProgramTypes } from "@/api/features";
import { pagerInit } from "@/hooks/usePagination";
import { toSelectType } from "@/utility/helper";
import { postBooking } from "@/api/booking";

export default function AddBookingForm({
  open,
  handler,
  onSubmit,
  booking,
  editMode,
}) {
  // const { postBooking, putBooking } = useBookings();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [features, setFeatures] = useState([]);
  const [programTypes, setProgramTypes] = useState([]);
  const [mealType, setMealType] = useState([
    { label: "Veg", value: 0 },
    { label: "Non-Veg", value: 1 },
  ]);
  const [functionType, setFunctionType] = useState([]);
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

  //select feature options from remote
  useEffect(() => {
    loadFeatures(null, setFeatures);
    loadFunctionTypes(null, setFunctionType);
    loadProgramTypes(null, setProgramTypes);
  }, []);
  const loadFeatures = async (inputValue, callback) => {
    var data = await getFeatures({
      ...pagerInit,
      query: inputValue || "",
    });
    callback(toSelectType(data?.data));
  };
  //select feature options from remote
  const loadFunctionTypes = async (inputValue, callback) => {
    var data = await getFunctionTypes({
      ...pagerInit,
      query: inputValue || "",
    });
    callback(toSelectType(data?.data));
  };
  const loadProgramTypes = async (inputValue, callback) => {
    var data = await getProgramTypes({
      ...pagerInit,
      query: inputValue || "",
    });
    callback(toSelectType(data?.data));
  };
  const loadMealType = (inputValue, callback) => {
    callback(
      mealType.filter((x) =>
        x.label?.toLowerCase().includes(inputValue?.toLowerCase())
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (editMode) {
      console.log(form);
      // putBooking(form).then((res) => {
      //   if (res.success) {
      //     bookingsHandler((prev) =>
      //       prev.map((val) => {
      //         if (val.id == form.id) {
      //           return res.data;
      //         }
      //         return val;
      //       })
      //     );
      //     setForm({});
      //     handler(false);
      //   }
      // });
    } else {
      postBooking(form)
        .then((booking) => {
          console.log(booking);
          onSubmit(booking);
        })
        .catch((err) => {
          setErrors(err?.response?.data?.errors);
          console.log(err);
        });
    }
  };
  return (
    <Modal
      open={open}
      title={editMode ? "Update" : "Add" + " Booking"}
      handleModal={handler}
      size={"1050px"}
    >
      <form onSubmit={handleSubmit} className=" w-full" action="#">
        <div className="flex flex-wrap justify-center gap-4 lg:justify-between">
          {formInput.map(({ label, id, type }) => {
            return (
              <div key={id} className="w-full lg:max-w-[30rem]">
                <Input
                  type={type || "text"}
                  value={[form[id]] || ""}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      [id]: e.target.value,
                    }));
                  }}
                  size="md"
                  className="w-full"
                  label={label}
                  id={id}
                />
              </div>
            );
          })}
          {[
            {
              placeHolder: "Select Features",
              name: "featureIds",
              isMulti: true,
              options: features,
              loadOptions: loadFeatures,
              handleChange: setForm,
            },
            {
              placeHolder: "Select Program Timings",
              name: "programTypeId",
              isMulti: false,
              options: programTypes,
              loadOptions: loadProgramTypes,
              handleChange: setForm,
            },
            {
              placeHolder: "Select Meal Type",
              name: "mealType",
              isMulti: false,
              options: mealType,
              loadOptions: loadMealType,
              handleChange: setForm,
            },
            {
              placeHolder: "Select Function Type",
              name: "functionTypeId",
              isMulti: false,
              options: functionType,
              loadOptions: loadFunctionTypes,
              handleChange: setForm,
            },
          ].map((x) => (
            <div key={x.name} className="w-full lg:max-w-[30rem]">
              <AsyncSelect
                isMulti={x?.isMulti}
                placeholder={x?.placeHolder}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    minHeight: "40px",
                    borderRadius: "7px",
                    border: errors?.bmsMasterId && "red 1.5px solid",
                  }),
                }}
                onChange={(e) => {
                  if (e) {
                    x.handleChange((prev) => ({
                      ...prev,
                      [x.name]: Array.isArray(e)
                        ? e.map((val) => val.value)
                        : e.value,
                    }));
                  }
                }}
                loadOptions={x?.loadOptions}
                defaultOptions={x?.options}
              />
            </div>
          ))}
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
