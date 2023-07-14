import { useState } from "react";
import { World } from "../icons";
import { Debounce, GetApi, Languages } from "../services";

function Translator() {
  const [language, setLanguage] = useState("es");
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [title, setTitle] = useState("Language");
  const [isOpen, setIsOpen] = useState(false);

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

  async function translateText() {
    await GetApi(language, text, setTranslation);
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white px-10">
      <div className="absolute w-[250px] top-20">
        <img src="./public/logo.webp" alt="" className="w-fit h-auto" />
      </div>
      <div className="w-full h-[500px] flex gap-10">
        <textarea
          id="text"
          className="w-[50%] resize-none outline-none font-custom rounded-xl text-xl p-8 bg-second text-white"
          value={text}
          placeholder="Escribe lo que deseas traducir..."
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <div className="w-[50%] relative flex justify-center font-custom rounded-xl text-xl p-8 bg-second text-white">
          <div className="absolute bg-first rounded-full my-2 p-2 flex items-center">
            <World />
            <div
              id="language"
              onClick={handdleClick}
              value={language}
              placeholder="Language"
              className="text-white  font-custom h-[25px] outline-none rounded-full px-44"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <span className="absolute left-14">{title}</span>
            </div>
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
