import { useEffect, useState } from "react";
import AxiosInstance from "../../connection";
import Company from "../../components/company/company";
import { useNavigate } from "react-router-dom";
import { clear, setItem } from "../../utils/storage";
import logout from "../../assets/icons/logout.svg";
import { toastfy } from "../../hooks/toasfy";
import { PulseLoader } from "react-spinners";
import edit from "../../assets/icons/edit.svg";
import ModalEditUser from "../../components/modal/modal.edit.user";

export default function Home({ init }: { init: boolean }) {
  const navigate = useNavigate();
  const [companiesList, setCompaniesList] = useState([]);
  const [userInfo, setUserInfo] = useState<any>([]);
  const [modalEdit, setModalEdit] = useState(false);

  async function getUserInfo() {
    const {
      data: { employee },
    } = await AxiosInstance.axiosPrivate.get("/userInfo/employee", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setUserInfo(employee);

    if (employee.photo) setItem("photo", employee.photo);
    setCompaniesList(employee.company);
  }

  async function handleLogout(e: any) {
    e.preventDefault();
    e.stopPropagation();
    await clear();
    toastfy("success", "Até logo!", "toast-success", 3000);
    setTimeout(() => {
      return navigate("/");
    }, 3000);
  }

  useEffect(() => {
    if (init) getUserInfo();
  }, [init]);

  return (
    <div className="w-full min-h-[90%] bg-gradient-to-t from-purple from-1% via-white via-10% to-white to-90% flex flex-col items-center">
      <div className="flex items-center justify-center w-full h-32 rounded-b-3xl bg-purple relative">
        <h2 className="text-title text-white">
          Olá,
          <span className="text-gold">
            {` ${localStorage.getItem("name")?.split(" ")[0] || ""}`}
          </span>
          !
        </h2>
        <div className="absolute top-2 flex justify-between items-center w-full px-2">
          <div
            onClick={() => setModalEdit(true)}
            className="flex flex-col items-center gap-1"
          >
            <img className="w-5 h-5" src={edit} alt="" />
            <h2 className="text-white">Editar</h2>
          </div>
          <div
            className="flex flex-col items-center gap-1"
            onClick={handleLogout}
          >
            <img className="w-5 h-5" src={logout} alt="" />
            <h2 className="text-white">Sair</h2>
          </div>
        </div>
      </div>
      {!init ? (
        <div className="w-full min-h-full flex flex-col items-center justify-center">
          <PulseLoader color="#240046" />
          <h2 className="text-purple text-subTitle">Carregando</h2>
        </div>
      ) : (
        <div className="w-full bg-white pt-7 h-full">
          <h1 className="w-full text-2xl text-center">Selecione uma empresa</h1>
          <div className="flex flex-wrap justify-around py-4 gap-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-purple w-full max-h-[calc(100vh-12rem)]">
            {companiesList
              ? companiesList.map(({ company }: any, key) => {
                  return (
                    <div
                      className="w-40 h-40 cursor-pointer rounded-3xl "
                      key={key}
                      onClick={() => {
                        navigate("/info");
                        setItem("company", company.id);
                      }}
                    >
                      <Company company={company} classNameH2={true} />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      )}
      {modalEdit && (
        <ModalEditUser userInfo={userInfo} setUser={setModalEdit} />
      )}
    </div>
  );
}
