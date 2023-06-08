import {
  UserCircleIcon,
  TableCellsIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  Profile,
  Bookings,
  MonthlyReport,
  YearlyReport,
} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import CalendarView from "../pages/dashboard/Calender";
import { BsCalendar2EventFill } from "react-icons/bs";
import roles from "@/roles";
import { ImStatsBars } from "react-icons/im";
import PaymentReceipts from "@/pages/dashboard/booking/PaymentReceipt";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import PrintInvoice from "@/pages/PrintReceipt";

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
  // {
  //   icon: <UserPlusIcon {...icon} />,
  //   name: "sign up",
  //   path: "/sign-up",
  //   element: <SignUp />,
  // },
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
        icon: <BsCalendar2EventFill {...icon} />,
        name: "Calendar",
        roles: [roles.superUser, roles.booking],
        path: "/calender",
        element: <CalendarView />,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "Bookings",
      //   roles: [roles.superUser],
      //   path: "/bookings/",
      //   element: <Bookings type={"all"} />,
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Bookings",
        roles: [roles.superUser, roles.booking, roles.report],
        path: "/monthly-bookings",
        element: <Bookings type="monthly" />,
      },
      {
        icon: <MdOutlineAccountBalanceWallet {...icon} />,
        name: "Pending Settlements",
        roles: [roles.superUser, roles.booking],
        path: "/pending-settlements",
        element: <Bookings type="pending" />,
      },
      {
        icon: <ImStatsBars {...icon} />,
        name: "Monthly Report",
        roles: [roles.superUser, roles.report],
        path: "/reports/monthly",
        element: <MonthlyReport />,
      },
      {
        icon: <ImStatsBars {...icon} />,
        name: "Yearly Report",
        roles: [roles.superUser, roles.report],
        path: "/reports/yearly",
        element: <YearlyReport />,
      },
    ],
  },
];

export const otherRoutes = [
  {
    name: "paymentReceipt",
    path: "booking/:id/receipts",
    element: <PaymentReceipts />,
    roles: [roles.superUser, roles.booking],
  },
  {
    path: "/bookings/:fnDate",
    element: <Bookings />,
    name: "bookings",
    roles: [roles.superUser, roles.booking],
  },
  {
    icon: <UserCircleIcon {...icon} />,
    name: "profile",
    roles: [roles.superUser, roles.booking, roles.report],
    path: "/profile",
    element: <Profile />,
  },
];

export default routes;
