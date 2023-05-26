import { Routes, Route } from "react-router-dom";
import { Footer } from "@/widgets/layout";
import { authRoutes } from "@/routes/routes";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

export function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  return (
    <div className="relative min-h-screen w-full">
      {/* <div className="container relative z-40 mx-auto p-4">
        <Navbar routes={navbarRoutes} />
      </div> */}
      <Routes>
        {authRoutes.map((route) => (
          <Route exact path={route.path} element={route.element} />
        ))}
      </Routes>
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <Footer />
      </div>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
