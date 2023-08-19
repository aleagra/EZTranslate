import { useState } from "react";
import { Detector, GetApi, Languages } from "../services";
import logo from "../assets/logo.webp";
import { Footer } from "./Footer";
import TextArea from "./TextArea";
import Translation from "./Translation";

function Translator() {
  const [language, setLanguage] = useState("es");
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [title, setTitle] = useState("Select language");
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
      <div className="grid grid-rows-[80px,1fr,80px] max-md:gap-6 gap-10 w-full h-screen max-md:h-[94vh] max-md:my-[3vh]">
        <div className="flex w-full bg-[#3355c7]  items-center row-start-1 justify-center py-10 max-md:pt-0">
          <img src={logo} alt="" className="max-md:w-[30%] w-[12%]" />
        </div>
        <div className="row-start-2 h-full flex max-md:flex-col gap-10 px-16 max-md:px-6">
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
