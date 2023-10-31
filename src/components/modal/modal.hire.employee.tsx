import { useState } from "react";
import Input from "../input/input";
import AxiosInstance from "../../connection";
import Button from "../button/button";
import { getItem } from "../../utils/storage";
import { toastfy } from "../../hooks/toasfy";

export default function HireEmployee({
  setShowModalNewEmployee,
}: {
  setShowModalNewEmployee: any;
}) {
  const [email, setEmail] = useState("");

  async function hireEmployee() {
    try {
      if (!email)
        return toastfy(
          "error",
          "O campo de email deve ser preenchido",
          "bg-red-500",
          3000
        );
      new Error();
      const findEmployee = await AxiosInstance.axiosPrivate.post(
        "/findEmployee/ceo",
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const hireEmployee = await AxiosInstance.axiosPrivate.put(
        `/hireEmployee/ceo/${findEmployee.data.id}/${await getItem("company")}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toastfy("success", hireEmployee.data.mensagem, "bg-green-500", 3000);
      setTimeout(() => {
        setEmail("");
      }, 3000);
    } catch (error: any) {
      if (error.response.status !== undefined) {
        toastfy("error", error.response.data.error, "bg-red-500", 3000);
        setTimeout(() => {
          setEmail("");
        }, 3000);
        return;
      }
    }
  }
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div className="bg-purpleDark w-80 h-60 rounded-2xl relative flex flex-col justify-evenly px-6">
        <h2
          onClick={() => setShowModalNewEmployee(false)}
          className="bg-gold rounded-[100%] absolute top-2 right-2 w-4 h-4 font-bold flex items-center justify-center"
        >
          x
        </h2>
        <h2 className="text-white text-textBodyBold w-full text-center">
          Novo Funcionário
        </h2>
        <Input
          label="Email"
          labelClassName="text-white"
          type="email"
          set={setEmail}
          value={email}
        />
        <Button text="Contratar" onClick={hireEmployee} color="gold" />
      </div>
    </div>
  );
}
