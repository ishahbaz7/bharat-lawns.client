import {
  Button,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { toPascalCase } from "@/utility/helper";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { MdEdit, MdEditOff } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getUser, putUser } from "@/api/auth";

function ProfileUpdate() {
  const [userData, setUserData] = useState({});
  const { setUser, cookie, user } = useAuth();
  const [errors, setErrors] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUser().then((u) => setUserData(u));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    putUser(userData)
      .then((res) => {
        // setUser((p) => ({
        //   ...p,
        //   // profileImgUrl: res.profileImgUrl || user?.profileImgUrl,
        //   name: userData.name,
        //   email: userData.email,
        //   phoneNumber: userData.phoneNumber,
        //   userName: userData.userName,
        // }));
        setUser(res);
        cookie.set("user", res, { path: "/" });

        setLoading(false);
        Swal.fire({
          title: "Success",
          text: "Profile detail has been saved!",
          icon: "success",
        });
        setEditMode(false);
      })
      .catch((err) => {
        setLoading(false);
        var errors = err.response?.data.errors;
        if (errors) setErrors(errors);
      });
  };
  const inputField = [
    { id: "name", label: "Name", value: userData.name || "" },
    {
      id: "userName",
      label: "User Name",
      value: userData.userName || "",
    },
    {
      id: "email",
      label: "Email",
      value: userData.email || "",
    },
    {
      id: "phoneNumber",
      label: "Mobile No",
      type: "number",
      value: userData.phoneNumber || "",
    },
  ];
  return (
    <div className=" w-[30rem]">
      <div className="mt-4 flex w-full justify-between lg:max-w-lg">
        <Typography variant="h5">Profile Settings</Typography>
        <Tooltip content="Edit">
          <IconButton onClick={() => setEditMode(!editMode)} variant="text">
            {editMode ? <MdEditOff size={25} /> : <MdEdit size={25} />}
          </IconButton>
        </Tooltip>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="my-10 space-y-5">
          {inputField.map((val) => {
            return (
              <div key={val.id} className="w-full">
                {!val.node ? (
                  <Input
                    disabled={!editMode}
                    error={errors ? !!errors[toPascalCase(val.id)] : false}
                    {...val}
                    onChange={(e) =>
                      setUserData((p) => ({
                        ...p,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />
                ) : (
                  val.node
                )}
                <span className="text-sm text-red-500">
                  {errors && errors[toPascalCase(val.id)]?.slice(-1)}
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

export default ProfileUpdate;
