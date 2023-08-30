import { World } from "../icons";
import SpechToText from "./SpeechToText";

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
          className="text-white w-full max-md:text-lg font-custom outline-none rounded-full"
        >
          <span className="max-md:text-base">
            Detectar lenguaje: {detector}
          </span>
        </div>
      </div>
      <div className="bg-white h-[65%] max-md:h-[250px] w-full max-lg:w-full relative flex justify-center font-custom rounded-lg text-xl text-white">
        <textarea
          maxLength={320}
          id="text"
          placeholder="Escribe o pega texto aquí."
          className="w-full resize-none outline-none font-custom max-md:text-lg rounded-xl max-md:p-4 text-2xl p-8 max-md:mb-14 text-black  bg-white"
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
