import { Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecoveryPassword from "./pages/RecoveryPassword";
import Home from "./pages/home";
import Company from "./pages/Company/Company";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/recoverypassword" element={<RecoveryPassword />} />
      <Route path="/info" element={<Company />} />
    </Routes>
  );
};

export default MainRoutes;
