import { useState } from "react";
import { Arrow, Copy, World } from "../icons";
import { Debounce, Detector, GetApi, Languages } from "../services";

function Translator() {
  const [language, setLanguage] = useState("es");
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [title, setTitle] = useState("Select language");
  const [isOpen, setIsOpen] = useState(false);
  const [detector, setDetector] = useState("");

  const handdleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = async (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setIsOpen(false);
    await GetApi(selectedLanguage, text, setTranslation);
  };

  // eslint-disable-next-line react/prop-types
  function LanguageText({ value, text, onClick }) {
    return (
      <button
        onClick={() => onClick(value)}
        className="font-custom hover:bg-second hover:rounded-lg p-3"
        value={value}
      >
        {text}
      </button>
    );
  }
  const copiarTexto = () => {
    navigator.clipboard.writeText(translation);
    console.log("Texto copiado:", translation);
  };

  async function translateText() {
    await GetApi(language, text, setTranslation);
    await Detector(text, setDetector);
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white px-10">
      <div className="absolute w-[250px] top-20">
        <img src="./public/logo.webp" alt="" className="w-fit h-auto" />
      </div>
      <div className="w-full h-[500px] flex gap-10">
        <div className="w-[50%]  relative flex justify-center font-custom rounded-xl text-xl p-8 bg-second text-white">
          <textarea
            id="text"
            className="w-full resize-none outline-none font-custom rounded-xl text-xl py-24 bg-second text-white"
            value={text}
            placeholder="Escribe lo que deseas traducir..."
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div className="absolute bg-first rounded-full flex items-center h-[50px]">
            <World />
            <div
              placeholder="Detectar idioma"
              className="text-white font-custom outline-none rounded-full px-44"
            >
              <span className="absolute left-14 top-3">
                Detect language: {detector}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[50%] relative flex justify-center font-custom rounded-xl text-xl p-8 bg-second text-white">
          <div onClick={copiarTexto}>
            <Copy />
          </div>
          <div
            className="absolute bg-first rounded-full flex items-center h-[50px] cursor-pointer"
            onClick={handdleClick}
          >
            <World />
            <div
              id="language"
              value={language}
              placeholder="Language"
              className="text-white font-custom outline-none rounded-full px-44"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <span className="absolute left-14 top-3 select-none">
                {title}
              </span>
            </div>
            <Arrow />
          </div>
          <div className="absolute w-full top-32 left-10">
            {translation && <p>{translation}</p>}
          </div>

          {isOpen && (
            <>
              <div className="absolute grid grid-cols-4 gap-4 bg-first rounded-lg my-16 p-4">
                {Languages.map((item) => (
                  <LanguageText
                    value={item.language}
                    text={item.name}
                    key={item.language}
                    onClick={(e) => {
                      handleLanguageChange(e);
                      setTitle(item.name);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Debounce translateText={translateText} text={text} />
    </div>
  );
}

export default Translator;
