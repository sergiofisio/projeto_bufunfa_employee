import { useEffect, useState } from "react";
import AxiosInstance from "../../connection";

export default function EmployeesShow() {

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    cpf:'',
    photo: ""
  })
  async function getUserInfo() {
    try {
      const {
        data: { employee },
      } = await AxiosInstance.axiosPrivate.get("/userInfo/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(employee);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return <div className="w-full h-5/6"></div>;
}
