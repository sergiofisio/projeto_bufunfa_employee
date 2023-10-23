import { Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecoveryPassword from "./pages/RecoveryPassword";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/recoverypassword" element={<RecoveryPassword />} />
    </Routes>
  );
};

export default MainRoutes;
