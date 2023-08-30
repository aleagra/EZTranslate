import { useState } from "react";
import { Detector, GetApi, Languages } from "../services";
import logo from "../assets/logo.webp";
import TextArea from "./TextArea";
import Translation from "./Translation";
import { Footer } from "./Footer";

function Translator() {
  const [language, setLanguage] = useState("es");
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [title, setTitle] = useState("Selecciona idioma");
  const [isOpen, setIsOpen] = useState(false);
  const [detector, setDetector] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handdleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = async (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setIsOpen(false);
    await GetApi(selectedLanguage, text, setTranslation);
  };

  const copiarTexto = () => {
    navigator.clipboard.writeText(translation);
  };

  async function translateText() {
    await GetApi(language, text, setTranslation);
  }
  async function detectorText() {
    await Detector(text, setDetector);
  }

  return (
    <>
      <div className="grid grid-rows-[70px,1fr,80px] max-md:gap-6 w-full h-screen max-md:h-[98vh]">
        <div className="flex w-full h-full bg-first border-b border-black/10 shadow-sm items-center justify-center max-md:pt-0 select-none z-10 cursor-pointer">
          <img src={logo} alt="" className="max-md:w-[150px] w-[150px]" />
        </div>
        <div className="row-start-2 h-full flex max-md:flex-col gap-10 max-md:gap-4 px-16 max-xl:px-6 ">
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            detector={detector}
            setIsListening={setIsListening}
            setText={setText}
            isListening={isListening}
          />

          <Translation
            translation={translation}
            isOpen={isOpen}
            Languages={Languages}
            handleLanguageChange={handleLanguageChange}
            setTitle={setTitle}
            detectorText={detectorText}
            translateText={translateText}
            text={text}
            title={title}
            setLanguage={setLanguage}
            handdleClick={handdleClick}
            copiarTexto={copiarTexto}
          />
        </div>
        <div className="row-start-3">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Translator;
