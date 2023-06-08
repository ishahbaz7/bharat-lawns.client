import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import useAuth from "@/hooks/useAuth";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes, { otherRoutes } from "@/routes/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import Authorized from "@/routes/AuthorizedRoutes";
import { Bookings } from "@/pages/dashboard";
import roles from "@/roles";
import Invoice from "@/pages/PrintReceipt";

export function Admin() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav routes={routes} brandImg={"/assets/logo.png"} />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        {/* <Configurator /> */}
        {/* <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        <Routes>
          {otherRoutes.map(({ path, element, roles }) => (
            <Route key={path} element={<Authorized allowRoles={roles} />}>
              <Route exact path={path} element={element} />
            </Route>
          ))}
          {routes.map(
            ({ layout, pages }) =>
              layout === "admin" &&
              pages.map(({ path, element, roles }) => (
                <Route key={path} element={<Authorized allowRoles={roles} />}>
                  <Route exact path={path} element={element} />
                </Route>
              ))
          )}
          {/* <Route element={<Authorized allowRoles={[roles.superUser]} />}>
            <Route element={<Bookings />} path="/bookings/:fnDate" />
          </Route> */}
        </Routes>
        {user && (
          <div className="text-blue-gray-600">
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}

Admin.displayName = "/src/layout/dashboard.jsx";

export default Admin;
