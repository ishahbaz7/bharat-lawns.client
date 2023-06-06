import { useEffect, useMemo, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import Modal from "@/widgets/share/Modal";
import AsyncSelect from "react-select/async";
import { getFeatures, getFunctionTypes, getProgramTypes } from "@/api/features";
import { pagerInit } from "@/hooks/usePagination";
import { toPascalCase, toSelectType } from "@/utility/helper";
import { getBooking, postBooking, putBooking } from "@/api/booking";
import Loading from "../shared/Loading";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import usePaymentReceipts from "@/hooks/usePaymentReceipts";

export const mealType = [
  { label: "Veg", value: 1 },
  { label: "Non-Veg", value: 2 },
];
const requiredField = (value) => {
  return <div className="text-blue-500">{value} *</div>;
};

export default function AddBookingForm({ open, handler, onSubmit, bookingId }) {
  // const { postBooking, putBooking } = useBookings();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [features, setFeatures] = useState([]);
  const [programTypes, setProgramTypes] = useState([]);
  const [functionType, setFunctionType] = useState([]);
  const params = useParams();
  const { printReceipt } = usePaymentReceipts();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (params?.fnDate != undefined || params?.fnDate != null) &&
      dayjs(params?.fnDate).isValid()
    ) {
      setForm((p) => ({ ...p, functionDate: params?.fnDate }));
    }
  }, [params]);

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
    onSubmit(data?.booking);
    setForm({});
    handler(false);
    printReceipt(data?.receipt?.id);
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
      postBooking({
        ...form,
        balance: form.balance || 0,
        advance: form.advance || 0,
        amount: form.amount || 0,
      })
        .then(thenCb)
        .catch(catchCb);
    }
  };
  const formInput = useMemo(
    () => [
      {
        label: requiredField("Name"),
        name: "name",
        isEditable: true,
      },
      {
        label: requiredField("Mobile No"),
        name: "mobileNo",
        type: "number",
        isEditable: true,
      },
      {
        label: requiredField("Amount"),
        name: "amount",
        type: "number",
        isEditable: false,
        onChange: (e) =>
          setForm((p) => ({
            ...p,
            amount: e.target.value,
            balance: form.advance
              ? parseInt(e.target.value) - parseInt(form.advance)
              : 0,
          })),
      },
      {
        label: "Advance",
        name: "advance",
        type: "number",
        isEditable: false,
        onChange: (e) =>
          setForm((p) => ({
            ...p,
            advance: e.target.value,
            balance: form.amount
              ? parseInt(form.amount) - parseInt(e.target.value)
              : 0,
          })),
      },
      {
        label: "Balance",
        name: "balance",
        type: "number",
        isEditable: false,
      },
      {
        node: (
          <div className="relative w-full md:max-w-[22rem]">
            <DatePicker
              dateFormat={"dd/MM/yyyy"}
              placeholderText="Select Function Date *"
              selected={
                form.functionDate ? dayjs(form.functionDate).toDate() : null
              }
              onChange={(val) => setForm((p) => ({ ...p, functionDate: val }))}
              className={
                " h-10 w-full  rounded-md border border-blue-gray-200 px-2 placeholder:text-blue-500"
              }
            />
            <span className="text-sm text-red-500">
              {errors &&
                errors.FunctionDate?.length > 0 &&
                errors.FunctionDate[0]}
            </span>
          </div>
        ),
        label: requiredField("Function Date"),
        name: "functionDate",
        type: "date",
        isEditable: true,
      },
    ],
    [form.functionDate]
  );
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
      type: "node",
      node: (
        <div className="w-full md:max-w-[22rem]">
          <Input
            label="Other Features"
            value={form?.otherFeatures}
            onChange={(e) =>
              setForm((p) => ({ ...p, otherFeatures: e.target.value }))
            }
          />
        </div>
      ),
    },
    {
      placeHolder: requiredField("Select Program Timings"),
      name: "programTypeId",
      id: "programTypes",
      isMulti: false,
      options: programTypes,
      loadOptions: loadProgramTypes,
      handleChange: setForm,
      defaultValue: selectedOptions?.programTypes,
    },
    {
      placeHolder: requiredField("Select Meal Type"),
      name: "mealType",
      id: "mealType",
      isMulti: false,
      options: mealType,
      loadOptions: loadMealType,
      handleChange: setForm,
      defaultValue: selectedOptions.mealType,
    },
    {
      placeHolder: requiredField("Select Function Type"),
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
        handleModal={() => {
          handler();
          if (params?.fnDate != undefined) {
            navigate("/admin/calender");
          }
        }}
        size={"800px"}
      >
        <form onSubmit={handleSubmit} className=" w-full" action="#">
          <span className="text-sm text-red-500">Required Fields *</span>
          <div className="mt-2 flex flex-wrap justify-center gap-4 lg:justify-between">
            {formInput.map(
              ({ label, name, type, value, isEditable, onChange, node }) => {
                if (!isEditable && bookingId) {
                  return;
                }
                if (node) {
                  return node;
                }
                return (
                  <div key={name} className="w-full md:max-w-[22rem]">
                    <Input
                      error={errors && errors[toPascalCase(name)]}
                      type={type || "text"}
                      value={
                        type == "date" && form?.functionDate
                          ? dayjs(form?.functionDate).format("YYYY-MM-DD")
                          : value || [form[name]] || ""
                      }
                      onChange={
                        onChange
                          ? onChange
                          : (e) => {
                              setForm((prev) => ({
                                ...prev,
                                [name]: e.target.value,
                              }));
                            }
                      }
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
              }
            )}
            {selectInputs.map((x) => {
              if (x.type == "node") {
                return x.node;
              }
              return (
                <div key={x.name} className="w-full md:max-w-[22rem]">
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
              onClick={() => {
                handler(false);
                if (params?.fnDate != undefined) {
                  navigate("/admin/calender");
                }
              }}
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
