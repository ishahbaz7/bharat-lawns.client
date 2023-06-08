import {
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import ProfileUpdate from "@/components/accountSettings/ProfileUpdate";
import PasswordChange from "@/components/accountSettings/PasswordChange";
import avatarImg from "/assets/avatar.jpeg";
import useAuth from "@/hooks/useAuth";
import { MdEdit } from "react-icons/md";

export function Profile() {
  const { user } = useAuth();
  return (
    <>
      <div
        style={{ backgroundImage: `url('../assets/images/profile.jpeg')` }}
        className="relative mt-8 h-72 w-full overflow-hidden rounded-xl  bg-cover	bg-center"
      >
        <div className="absolute inset-0 h-full w-full bg-blue-500/30" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className=" flex items-center gap-6">
              <div className=" h-[74px] w-[74px] overflow-hidden rounded-full">
                <img
                  src={
                    user?.profileImgUrl
                      ? `${import.meta.env.VITE_API}/${user?.profileImgUrl}`
                      : avatarImg
                  }
                  alt="profile image"
                  className="w-full shadow-lg shadow-blue-gray-500/40 "
                />
              </div>

              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {user?.name}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <ProfileUpdate />
            <PasswordChange />
          </div>
        </CardBody>
      </Card>
    </>
  );
}
