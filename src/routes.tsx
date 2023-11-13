import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecoveryPassword from "./pages/RecoveryPassword";
import ChangePassword from "./pages/ChangePassword";
import Expense from "./components/company/company.expense";
import { clear, getItem } from "./utils/storage";
import { useEffect, useState } from "react";
import AxiosInstance from "./connection";
import { toastfy } from "./hooks/toasfy";
import { PulseLoader } from "react-spinners";
import Company from "./pages/company";

function UserLogged({ redirectTo }: { redirectTo: string }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await AxiosInstance.axiosPrivate.get("/verifyToken/employee", {
          headers: {
            Authorization: `Bearer ${await getItem("token")}`,
          },
        });
      } catch (error: any) {
        console.log(error);

        if (error.response.status === 401) {
          toastfy("error", "Sua sessão expirou", "text-red", 3000);
          await clear();
          setTimeout(() => {
            return navigate("/");
          }, 3000);
        }
      }
    };

    const checkAuth = async () => {
      const authToken = await getItem("token");

      if (authToken) await verifyToken();
      setIsAuth(Boolean(authToken));
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <PulseLoader color="white" />
        <h2 className="text-white">Carregando</h2>
      </div>
    );
  }

  return isAuth ? <Navigate to={redirectTo} /> : <Outlet />;
}

function ProtectRoute({ redirectTo }: { redirectTo: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = await getItem("token");
      setIsAuth(Boolean(authToken));
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flexflex-col items-center justify-center">
        <PulseLoader color="white" />
        <h2 className="text-white">Carregando</h2>
      </div>
    );
  }

  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default function MainRoutes() {
  const [init, setInit] = useState(false);
  useEffect(() => {
    const initiService = async () => {
      const {
        data: { initial },
      } = await AxiosInstance.axiosInit.get("/");

      if (initial) {
        setInit(true);
      }
    };

    initiService();
  }, []);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            {`(╯°□°）╯︵ ┻━┻ 
                     Essa página não existe!`}
          </h1>
        }
      ></Route>
      <Route element={<UserLogged redirectTo="/home" />}>
        <Route path="/">
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login init={init} />} />
          <Route path="/recoveryPassword" element={<RecoveryPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Route>
      </Route>
      <Route element={<ProtectRoute redirectTo="/" />}>
        <Route path="/home" element={<Home init={init} />} />
        <Route path="/info" element={<Company />} />
        <Route path="/required" element={<Expense />} />
        <Route path="/shop" element={<Expense />} />
      </Route>
    </Routes>
  );
}
