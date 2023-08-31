import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Microphone, StopIcon } from "../icons";
import Tooltip from "./Tooltip";

function SpechToText({ isListening, setIsListening, setText, text }) {
  const [isclick, setIsclick] = useState(false);
  const {
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
  }, [listening, interimTranscript, setText]);

  useEffect(() => {
    if (finalTranscript !== "") {
      setText(finalTranscript);
    }
  }, [finalTranscript, setText]);

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
  const click = () => {
    setIsclick(true);
  };

  return (
    <div className="absolute z-20 2xl:bottom-8 bottom-4 left-0 px-8 max-md:bottom-0 gap-9 flex justify-between items-center w-full">
      <button
        className="rounded-md"
        onClick={handleToggleListening}
        aria-label={
          isListening ? "Detener micrófono" : "Iniciar grabación de voz"
        }
      >
        {isListening ? (
          <Tooltip
            setIsclick={setIsclick}
            isclick={isclick}
            position={"top"}
            click={click}
            icon={<StopIcon />}
            text={"Detener traduccion por voz"}
          ></Tooltip>
        ) : (
          <Tooltip
            setIsclick={setIsclick}
            click={click}
            isclick={isclick}
            position={"top"}
            text={"Traducir por voz"}
            icon={<Microphone />}
          ></Tooltip>
        )}
      </button>
      {isListening ? (
        <button
          className="max-md:text-base text-first rounded-md font-medium"
          onClick={handleReset}
        >
          <Tooltip
            position={"top"}
            text={"Borrar Traduccion"}
            icon={"Reset"}
          ></Tooltip>
        </button>
      ) : (
        ""
      )}
      <span className="text-xl text-black max-md:text-base font-medium">
        {text?.length} / 320
      </span>
    </div>
  );
}
export default SpechToText;
