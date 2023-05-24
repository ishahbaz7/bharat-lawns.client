import { Routes, Route, Navigate } from "react-router-dom";
import { Auth, Admin } from "@/layouts";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
