import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import logo from "./assets/logo.svg";
import img1 from "./assets/imgWhat.svg";
import imgCeo from "./assets/imgCeo.svg";
import arrow from "./assets/arrow.svg";
import iconStepActive from "./assets/stepActive.svg";
import iconStepInactive from "./assets/stepInactive.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstances from "./connection";

function App() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [imgInfo, setImgInfo] = useState(img1);

  function handleClickArrow(e: React.MouseEvent, arrow: string) {
    e.preventDefault();
    e.stopPropagation();

    if (arrow === "right" && step === 2) {
      setStep(Number(step) + 1);
      return setImgInfo(imgCeo);
    }
    if (arrow === "left" && step === 3) {
      setStep(Number(step) - 1);
      return setImgInfo(img1);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setStep(2);
    }, 2000);

    const initiService = async () => {
      await axiosInstances.axiosInit.get("/");
    };

    initiService();
  }, []);

  return (
    <div className="w-full h-[90%] bg-transparent flex items-center justify-center"></div>
  );
}

export default App;
