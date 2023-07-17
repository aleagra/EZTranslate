import { useEffect, useState } from "react";
import { Arrow, Copy, Microphone, StopIcon, World } from "../icons";
import { Debounce, Detector, GetApi, Languages } from "../services";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
function Translator() {
  const [language, setLanguage] = useState("es");
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [title, setTitle] = useState("Select language");
  const [isOpen, setIsOpen] = useState(false);
  const [detector, setDetector] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition();

  const handleInterimTranscript = (interimTranscript) => {
    setText(interimTranscript);
  };

  useEffect(() => {
    // Aquí realizamos la traducción en tiempo real
    const translateText = async () => {
      await GetApi(language, text, setTranslation);
    };

    // Verificamos si el reconocimiento de voz está activo y actualizamos la transcripción
    if (listening) {
      if (finalTranscript !== "") {
        setText(finalTranscript);
        translateText(); // Realizar la traducción cuando hay un texto final
      } else {
        handleInterimTranscript(interimTranscript); // Actualizar el texto intermedio
      }
    }
  }, [listening, language, text, finalTranscript, interimTranscript]);

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }, [
    isListening,
    SpeechRecognition.startListening,
    SpeechRecognition.stopListening,
  ]);

  const handleToggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  const handleReset = () => {
    setText(""); // Resetear el estado 'text' a una cadena vacía
    resetTranscript(); // Resetear el estado 'transcript' a una cadena vacía
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
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
        <div className="w-[50%] relative flex justify-center font-custom rounded-xl text-xl p-8 bg-second text-white">
          <textarea
            id="text"
            className="w-full resize-none outline-none font-custom rounded-xl text-xl py-24 bg-second text-white"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <p className="w-fit absolute resize-none z-20 font-custom rounded-xl text-xl top-32 left-8 bg-second text-white">{transcript}</p>
          <div className="absolute z-20 w-full h-[30px] bottom-8 gap-9 flex items-center justify-center">
            <button className="hover:bg-first p-4 rounded-full" onClick={handleToggleListening}>
              {isListening ? <StopIcon /> : <Microphone />}
            </button>
            <button onClick={handleReset}>Reset</button>
          </div>
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
          <div className="w-full flex"></div>
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
            {interimTranscript && <p>{interimTranscript}</p>}
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
