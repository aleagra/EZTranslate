import { useState } from "react";
import axios from "axios";
import { World } from "../icons";
function Translator() {
  const [language, setLanguage] = useState("en");
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handdleClick = () => {
    setIsOpen(!isOpen);
  };

  function LanguageText ({ value, text }) {
    return (
      <button onClick={handdleClick} className="font-custom hover:bg-second hover:rounded-full p-3" value={value}>
        {text}
      </button>
    );
  };

  const translateText = async () => {
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        "to[0]": language,
        "api-version": "3.0",
        profanityAction: "NoAction",
        textType: "plain",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "285c59d0b8msh46372bba5f66c71p1194bbjsn26a8dd6a017b",
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
      },
      data: [
        {
          Text: text,
        },
      ],
    };

    try {
      const response = await axios.request(options);
      setTranslation(response.data[0].translations[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white px-10">
      <div className="w-full h-[500px] flex gap-10">
        <div className="w-[50%] relative flex justify-center">
          <div className="absolute bg-first rounded-full my-2 p-4 flex items-center">
            <World />
            <bottom
              id="language"
              onClick={handdleClick}
              value={language}
              className="text-white font-custom h-[25px] outline-none rounded-full px-44"
              onChange={(e) => setLanguage(e.target.value)}
            >
              Languaje
            </bottom>
          </div>
          {isOpen && (
            <>
              <div className="absolute grid grid-cols-4 gap-6 bg-first rounded-xl my-20 p-2 px-8 ">
                <LanguageText value="en" text="English" />
                <LanguageText value="en" text="English" />
                <LanguageText value="en" text="English" />
                <LanguageText value="en" text="English" />
              </div>
            </>
          )}
          <textarea
            id="text"
            className="w-full font-custom resize-none rounded-xl outline-none text-xl p-8 bg-second  text-white pt-20"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="w-[50%]   rounded-xl p-8 bg-second  text-white">
          {translation && <p>{translation}</p>}
        </div>
      </div>
      <button onClick={translateText}>Translate</button>
    </div>
  );
}
export default Translator;
