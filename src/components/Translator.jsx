import { useState } from "react";
import { World } from "../icons";
import GetApi from "../services/GetApi";
import { Debounce, Languages } from "../services";

function Translator() {
  const [language, setLanguage] = useState("en");
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
        <img src="./public/logo.png" alt="" className="w-fit h-auto" />
      </div>
      <div className="w-full h-[500px] flex gap-10">
        <div className="w-[50%] relative flex justify-center">
          <div className="absolute bg-first rounded-full my-2 p-4 flex items-center">
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
          {isOpen && (
            <>
              <div className="absolute grid grid-cols-4 gap-4 bg-first rounded-lg my-20 p-4">
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
          <textarea
            id="text"
            className="w-full font-custom resize-none rounded-xl outline-none text-xl p-8 bg-second  text-white pt-20"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="w-[50%] font-custom rounded-xl text-xl p-8 bg-second text-white">
          {translation && <p>{translation}</p>}
        </div>
      </div>
      <Debounce translateText={translateText} text={text} />
    </div>
  );
}

export default Translator;
