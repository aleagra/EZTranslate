import { useEffect, useState } from "react";
import { Arrow, Copy, Microphone, StopIcon, World } from "../icons";
import { Debounce, Detector, GetApi, Languages } from "../services";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import logo from "../assets/logo.webp";
import { Footer } from "./Footer";

function Translator() {
  const [language, setLanguage] = useState("es");
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [title, setTitle] = useState("Select language");
  const [isOpen, setIsOpen] = useState(false);
  const [detector, setDetector] = useState("");
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition({
    interimTranscriptDelay: 0,
  });

  useEffect(() => {
    if (listening) {
      setText(interimTranscript);
    }
  }, [listening, interimTranscript]);

  useEffect(() => {
    if (finalTranscript !== "") {
      setText(finalTranscript);
    }
  }, [finalTranscript]);

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isListening]);

  const handleToggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  const handleReset = () => {
    setText("");
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn t support speech recognition.</span>;
  }

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
        className="font-custom hover:bg-second max-md:bg-second max-md:rounded-lg hover:rounded-lg p-2 max-lg:text-sm"
        value={value}
      >
        {text}
      </button>
    );
  }

  const copiarTexto = () => {
    navigator.clipboard.writeText(translation);
  };

  async function translateText() {
    await GetApi(language, text, setTranslation);
    await Detector(text, setDetector);
  }

  return (
    <>
      <div className=" relative">
        <div className="flex w-full justify-center absolute top-4">
          <img
            src={logo}
            alt=""
            className="w-[300px] absolute h-auto max-md:w-[150px] max-md:my-6"
          />
        </div>
        <div className="w-full h-screen flex flex-col items-center justify-center pb-[70px] pt-[100px] text-white px-10 max-sm:px-6">
          <div className="w-full h-[650px] max-md:h-[500px] flex gap-10 max-lg:flex-col">
            <div className="w-[50%] h-full max-lg:p-4 max-lg:w-full relative flex justify-center font-custom rounded-xl max-md:rounded-md text-xl p-8 border border-white/20 bg-first text-white">
              <textarea
                maxLength={520}
                id="text"
                className="w-full resize-none outline-none font-custom rounded-xl text-xl pt-24 max-md:pt-20 max-md:px-4 text-white bg-first"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              {!isListening && (
                <p className="w-fit h-[300px] absolute resize-none z-20 font-custom rounded-xl text-xl top-32 left-8 bg-second text-white">
                  {transcript}
                </p>
              )}
              <div className="absolute z-20 w-full h-[30px] bottom-8 max-md:bottom-3 gap-9 flex items-center justify-center ">
                <button
                  className="hover:bg-first p-4 rounded-full"
                  onClick={handleToggleListening}
                  aria-label={
                    isListening
                      ? "Detener micrófono"
                      : "Iniciar grabación de voz"
                  }
                >
                  {isListening ? <StopIcon /> : <Microphone />}
                </button>
                <button className="max-md:text-sm" onClick={handleReset}>
                  Reset
                </button>
              </div>
              <label
                className="absolute bg-second rounded-full max-md:rounded-lg flex items-center h-[50px] max-lg:w-[300px] max-lg:top-4"
                htmlFor="text"
              >
                <World />
                <div
                  placeholder="Detectar idioma"
                  className="text-white font-custom outline-none rounded-full px-44"
                >
                  <span className="absolute left-14 top-3 max-md:text-base">
                    Detect language: {detector}
                  </span>
                </div>
              </label>
            </div>
            <div className="w-[50%] h-full max-lg:p-4 overflow-x-hidden break-words max-lg:w-full relative flex justify-center font-custom rounded-xl text-xl p-8 bg-first text-white max-md:rounded-md border border-white/20">
              <div
                onClick={copiarTexto}
                className="hover:bg-white/10 p-4 max-md:p-2 rounded-full w-fit absolute bottom-6 max-md:right-4 max-md:bottom-4 right-10 active:bg-first active:transition-colors cursor-pointer"
              >
                <Copy />
              </div>
              <div
                className="absolute bg-second rounded-full max-md:rounded-md flex items-center h-[50px] cursor-pointer max-lg:w-[300px] max-md:top-6"
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
                  <span className="absolute left-14 top-3 select-none max-md:text-base">
                    {title}
                  </span>
                </div>
                <Arrow />
              </div>
              <div className="">
                {translation && (
                  <p className="w-[100%] h-[100px] absolute top-32 max-lg:top-28 left-0 px-8 max-lg:px-4">
                    {translation}
                  </p>
                )}
              </div>

              {isOpen && (
                <>
                  <div className="absolute grid grid-cols-4 max-lg:grid-cols-3 max-lg:whitespace-nowrap gap-4 border max-md:border-none border-white/20 bg-first rounded-lg my-16 p-4">
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
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Translator;
