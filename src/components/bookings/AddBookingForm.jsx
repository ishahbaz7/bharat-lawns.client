import { useEffect, useState } from "react";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import Modal from "@/widgets/share/Modal";
import useBookings from "@/hooks/useBookings";
import AsyncSelect from "react-select/async";
import { getFeatures, getFunctionTypes, getProgramTypes } from "@/api/features";
import { pagerInit } from "@/hooks/usePagination";
import { toPascalCase, toSelectType } from "@/utility/helper";
import { getBooking, postBooking, putBooking } from "@/api/booking";
import Loading from "../shared/Loading";
import dayjs from "dayjs";

export const mealType = [
  { label: "Veg", value: 1 },
  { label: "Non-Veg", value: 2 },
];
const formInput = [
  {
    label: "Name",
    name: "name",
    isEditable: true,
  },
  {
    label: "Mobile No",
    name: "mobileNo",
    type: "number",
    isEditable: true,
  },
  {
    label: "Amount",
    name: "amount",
    type: "number",
    isEditable: false,
  },
  {
    label: "Advance",
    name: "advance",
    type: "number",
    isEditable: false,
  },
  {
    label: "Balance",
    name: "balance",
    type: "number",
    isEditable: false,
  },
  {
    label: "Function Date",
    name: "functionDate",
    type: "date",
    isEditable: true,
  },
];

export default function AddBookingForm({ open, handler, onSubmit, bookingId }) {
  // const { postBooking, putBooking } = useBookings();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [features, setFeatures] = useState([]);
  const [programTypes, setProgramTypes] = useState([]);
  const [functionType, setFunctionType] = useState([]);

  useEffect(() => {
    if (bookingId) {
      getBooking(bookingId)
        .then((booking) => {
          setSelectedOptions({
            features: toSelectType(booking.features),
            programTypes: toSelectType(booking.programTypes),
            functionTypes: toSelectType(booking.functionTypes),
            mealType: mealType.find((x) => x.value == booking?.mealType),
          });
          setForm({
            ...booking,
            featureIds: booking.features.map((x) => x.id),
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [bookingId]);

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
  //select options from remote

  const thenCb = (data) => {
    onSubmit(data);
    setForm({});
    handler(false);
  };
  const catchCb = (err) => {
    setLoading(false);
    setErrors(err?.response?.data?.errors);
    console.log(err);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    if (bookingId) {
      putBooking(bookingId, form).then(thenCb).catch(catchCb);
    } else {
      postBooking(form).then(thenCb).catch(catchCb);
    }
  };
  const selectInputs = [
    {
      placeHolder: "Select Features",
      name: "featureIds",
      id: "features",
      isMulti: true,
      options: features,
      loadOptions: loadFeatures,
      handleChange: setForm,
      defaultValue: selectedOptions?.features,
    },
    {
      placeHolder: "Select Program Timings",
      name: "programTypeId",
      id: "programTypes",
      isMulti: false,
      options: programTypes,
      loadOptions: loadProgramTypes,
      handleChange: setForm,
      defaultValue: selectedOptions?.programTypes,
    },
    {
      placeHolder: "Select Meal Type",
      name: "mealType",
      id: "mealType",
      isMulti: false,
      options: mealType,
      loadOptions: loadMealType,
      handleChange: setForm,
      defaultValue: selectedOptions.mealType,
    },
    {
      placeHolder: "Select Function Type",
      name: "functionTypeId",
      id: "functionTypes",
      isMulti: false,
      options: functionType,
      loadOptions: loadFunctionTypes,
      handleChange: setForm,
      defaultValue: selectedOptions?.functionTypes,
    },
  ];
  return (
    <>
      {loading && <Loading />}
      <Modal
        open={open}
        title={bookingId ? "Update" : "Add" + " Booking"}
        handleModal={handler}
        size={"1050px"}
      >
        <form onSubmit={handleSubmit} className=" w-full" action="#">
          <div className="flex flex-wrap justify-center gap-4 lg:justify-between">
            {formInput.map(({ label, name, type, value, isEditable }) => {
              if (!isEditable && bookingId) {
                return;
              }
              return (
                <div key={name} className="w-full lg:max-w-[30rem]">
                  <Input
                    error={errors && errors[toPascalCase(name)]}
                    type={type || "text"}
                    value={
                      type == "date" && form?.functionDate
                        ? dayjs(form?.functionDate).format("YYYY-MM-DD")
                        : value || [form[name]] || ""
                    }
                    onChange={(e) => {
                      setForm((prev) => ({
                        ...prev,
                        [name]: e.target.value,
                      }));
                    }}
                    size="md"
                    className="w-full"
                    label={label}
                    id={name}
                  />
                  <span className="text-sm text-red-500">
                    {errors &&
                      errors[toPascalCase(name)]?.length > 0 &&
                      errors[toPascalCase(name)][0]}
                  </span>
                </div>
              );
            })}
            {selectInputs.map((x) => {
              return (
                <div key={x.name} className="w-full lg:max-w-[30rem]">
                  <AsyncSelect
                    value={x.defaultValue}
                    isMulti={x?.isMulti}
                    placeholder={x?.placeHolder}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        minHeight: "40px",
                        borderRadius: "7px",
                        border:
                          errors &&
                          errors[toPascalCase(x.name)] &&
                          "red 1.5px solid",
                      }),
                    }}
                    onChange={(e) => {
                      if (e) {
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [x.id]: e,
                        }));
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
                  <span className="text-sm text-red-500">
                    {errors &&
                      errors[toPascalCase(x.name)]?.length > 0 &&
                      errors[toPascalCase(x.name)][0]}
                  </span>
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
              <span>{bookingId ? "Update" : "Add"}</span>
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
