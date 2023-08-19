/* eslint-disable react/prop-types */
import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Microphone, StopIcon } from "../icons";

function SpechToText({ isListening, setIsListening, setText }) {
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

  return (
    <div className="absolute z-20 w-full h-[30px] bottom-8 max-md:bottom-3 gap-9 flex items-center justify-center">
      <button
        className="hover:bg-[#ebecf1] p-4 rounded-full"
        onClick={handleToggleListening}
        aria-label={
          isListening ? "Detener micrófono" : "Iniciar grabación de voz"
        }
      >
        {isListening ? <StopIcon /> : <Microphone />}
      </button>
      <button
        className="max-md:text-sm text-[#3355c7] font-semibold"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}
export default SpechToText;
