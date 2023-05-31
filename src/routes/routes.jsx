import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Profile, Notifications, Bookings } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import CalendarView from "../pages/dashboard/Calender";
import { BsCalendar2EventFill } from "react-icons/bs";
import roles from "@/roles";
import Reports from "@/pages/dashboard/Reports";
import { ImStatsBars } from "react-icons/im";
import PaymentReceipts from "@/pages/dashboard/booking/PaymentReceipt";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const authRoutes = [
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
];

export const routes = [
  {
    layout: "admin",
    pages: [
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "dashboard",
      //   roles: [roles.superUser],
      //   path: "/dashboard",
      //   element: <Home />,
      // },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Bookings",
        roles: [roles.superUser],
        path: "/bookings/",
        element: <Bookings />,
      },
      {
        icon: <ImStatsBars {...icon} />,
        name: "Reports",
        roles: [roles.superUser],
        path: "/reports/",
        element: <Reports />,
      },

      {
        icon: <BsCalendar2EventFill {...icon} />,
        name: "Calendar",
        roles: [roles.superUser],
        path: "/calender",
        element: <CalendarView />,
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
    ],
  },
];

export const otherRoutes = [
  { name: "paymentReceipt", path: "booking/:id", element: <PaymentReceipts /> },
];

export default routes;
