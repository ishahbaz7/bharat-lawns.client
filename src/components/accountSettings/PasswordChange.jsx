import {
  Button,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { MdEdit, MdEditOff } from "react-icons/md";
import { toPascalCase } from "@/utility/helper";
import Swal from "sweetalert2";
import { updatePassword } from "@/api/auth";

function PasswordChange() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    console.log(form);
    updatePassword(form)
      .then((res) => {
        setLoading(false);
        setEditMode(false);
        setShowPassword(false);
        setForm({});
        Swal.fire({
          title: "Success",
          text: "Password has been changed successfully!",
          icon: "success",
        });
      })
      .catch((err) => {
        setLoading(false);
        var errors = err.response?.data.errors;
        if (errors) setErrors(errors);
      });
  };

  const inputField = [
    { id: "password", label: "Password" },
    { id: "newPassword", label: "New Password" },
    { id: "confirmPassword", label: "Confirm Password" },
  ];
  return (
    <div className=" w-[30rem]">
      <div className="mt-4 flex w-full justify-between lg:max-w-lg">
        <Typography variant="h5">Change Password</Typography>
        <Tooltip content="Edit">
          <IconButton onClick={() => setEditMode(!editMode)} variant="text">
            {editMode ? <MdEditOff size={25} /> : <MdEdit size={25} />}
          </IconButton>
        </Tooltip>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="my-10 space-y-5">
          <span className="text-xs text-red-500"></span>
          {inputField.map((val) => {
            return (
              <div key={val.id} className=" w-full lg:max-w-lg">
                <Input
                  error={errors ? !!errors[toPascalCase(val.id)] : false}
                  value={form[val.id] || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [e.target.id]: e.target.value }))
                  }
                  {...val}
                  type={showPassword ? "text" : "password"}
                  disabled={!editMode}
                  icon={
                    showPassword ? (
                      <AiFillEyeInvisible
                        className="cursor-pointer"
                        onClick={() => setShowPassword(false)}
                        size={20}
                      />
                    ) : (
                      <AiFillEye
                        className="cursor-pointer"
                        onClick={() => setShowPassword(true)}
                        size={20}
                      />
                    )
                  }
                />
                <span className="text-xs text-red-500">
                  {errors ? errors[toPascalCase(val.id)]?.slice(-1) : ""}
                </span>
              </div>
            );
          })}
        </div>
        <Button
          disabled={loading || !editMode}
          className="flex items-center"
          type="submit"
        >
          Save{" "}
          {loading && (
            <AiOutlineLoading3Quarters
              className="ml-2 animate-spin"
              size={15}
            />
          )}
        </Button>
      </form>
    </div>
  );
}

export default PasswordChange;
