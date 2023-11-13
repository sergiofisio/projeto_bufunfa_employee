import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import logo from "./assets/logo.svg";
import img1 from "./assets/imgWhat.svg";
import imgEmployee from "./assets/imgEmployee.svg";
import arrow from "./assets/arrow.svg";
import iconStepActive from "./assets/stepActive.svg";
import iconStepInactive from "./assets/stepInactive.svg";
import { useEffect, useState } from "react";
import Button from "./components/button/button";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [imgInfo, setImgInfo] = useState(img1);

  function handleClickArrow(e: React.MouseEvent, arrow: string) {
    e.preventDefault();
    e.stopPropagation();

    if (arrow === "right" && step === 2) {
      setStep(Number(step) + 1);
      return setImgInfo(imgEmployee);
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
  }, []);

  return (
    <div className="w-full h-[90%] bg-transparent flex items-center justify-center">
      <div
        className={`w-full h-full p-4 transition-all duration-500 ${
          step === 1 ? "bg-purple" : "bg-white"
        } flex flex-col items-center justify-evenly gap-12`}
      >
        {step === 1 ? (
          <img
            className={`transition-all duration-500 ${
              step === 1 ? "opacity-100" : "opacity-0"
            }`}
            src={logo}
            alt="logo bunfunfa"
          />
        ) : (
          <>
            <img
              className={`h-72 transition-all duration-500 ${
                step !== 1 ? "opacity-100" : "opacity-0"
              }`}
              src={imgInfo}
              alt="image"
            />
            <h2
              className={`text-title font-semi bold text-gold transition-all duration-500 ${
                step !== 1 ? "opacity-100" : "opacity-0"
              }
              `}
            >
              {step === 2 ? "O que é?" : "Funcionário"}
            </h2>{" "}
            <p
              className={`text-textBody2 text-center p-7 w-full h-40 ${
                step !== 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              {step === 2
                ? "O Bufunfa é um aplicativo que ajuda jovens a entender, na prática, como administrar as suas decisões financeiras através de uma empresa virtual fictícia, que demonstra como são as responsabilidades da vida financeira adulta."
                : " A conta Funcionário é utilizada por jovens que desejam aprender a administrar seu dinheiro, podendo participar de um empresa criada por um CEO, receber mesadas, realizar tarefas e utilizar seu dinheiro para comprar coisas oferecidas pelo CEO."}
            </p>
            <div
              className={`flex justify-between w-full transition-all duration-500 ${
                step !== 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                onClick={(e) => handleClickArrow(e, "left")}
                className={`rotate-180 transition-all duration-500 ${
                  step === 3 ? "opacity-100" : "opacity-0"
                }`}
                src={arrow}
                alt="arrow"
              />
              <div
                className={`flex gap-2 transition-all duration-500 ${
                  step !== 1 ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={step === 2 ? iconStepInactive : iconStepActive}
                  alt="stepActive"
                />
                <img
                  src={step === 3 ? iconStepInactive : iconStepActive}
                  alt="stepActive"
                />
              </div>
              <img
                onClick={(e) => handleClickArrow(e, "right")}
                className={`transition-all duration-500 ${
                  step === 2 ? "opacity-100" : "opacity-0"
                }`}
                src={arrow}
                alt="arrow"
              />
            </div>
            <div
              className={`w-full transition-all duration-500 ${
                step === 3 ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                text="Começar"
                color="purple"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
