import { World } from "../icons";
import SpechToText from "./SpeechToText";
/* eslint-disable react/prop-types */
function TextArea({
  value,
  onChange,
  isListening,
  setText,
  setIsListening,
  detector,
}) {
  return (
    <div className="w-full flex flex-col justify-center">
      <div
        className="bg-first relative rounded-lg max-md:rounded-lg flex items-center h-[50px] mb-10 w-[350px] mx-auto text-center"
        htmlFor="text"
      >
        <World />
        <div
          placeholder="Detectar idioma"
          className="text-white w-full font-custom outline-none rounded-full"
        >
          <span className="max-md:text-base">Detect language: {detector}</span>
        </div>
      </div>
      <div className="max-md:h-[45%] bg-white h-[65%] w-full max-lg:p-4 max-lg:w-full relative flex justify-center font-custom rounded-lg max-md:rounded-md text-xl p-8text-white">
        <textarea
          maxLength={520}
          id="text"
          placeholder="Escribe o pega texto aquí."
          className="w-full resize-none outline-none font-custom rounded-xl text-2xl p-10 max-md:pt-20 max-md:px-4 text-black border shadow-sm border-black/10 bg-white"
          value={value}
          onChange={onChange}
        />
        <SpechToText
          isListening={isListening}
          setIsListening={setIsListening}
          setText={setText}
        />
      </div>
    </div>
  );
}

export default TextArea;
