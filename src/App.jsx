import { Routes, Route, Navigate } from "react-router-dom";
import { Auth, Admin } from "@/layouts";
import NotFound from "./pages/NotFound";
import "react-datepicker/dist/react-datepicker.css";
import PrintReceipt from "./pages/PrintReceipt";

function App() {
  return (
    <Routes>
      <Route element={<PrintReceipt />} path="/receipt/:id" />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/" element={<Navigate to="/admin/calender" />} />
      <Route path="/admin" element={<Navigate to="/admin/calender" />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
