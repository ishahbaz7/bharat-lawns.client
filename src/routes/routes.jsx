import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications, Bookings } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import CalendarView from "../pages/dashboard/Calender";
import { BsCalendar2EventFill } from "react-icons/bs";
import roles from "@/roles";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        roles: [roles.superUser],
        path: "/dashboard",
        element: <Home />,
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Bookings",
        roles: [roles.superUser],
        path: "/bookings",
        element: <Bookings />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        roles: [roles.superUser],
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifications",
        roles: [roles.superUser],
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <BsCalendar2EventFill {...icon} />,
        name: "Calendar",
        roles: [roles.superUser],
        path: "/calender",
        element: <CalendarView />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
