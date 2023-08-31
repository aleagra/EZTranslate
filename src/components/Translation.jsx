import { Arrow, Copy } from "../icons";
import { Debounce } from "../services";
import LanguageText from "./LanguageText";
import Tooltip from "./Tooltip";

function Translation({
  translation,
  isOpen,
  Languages,
  handleLanguageChange,
  setTitle,
  detectorText,
  translateText,
  text,
  copiarTexto,
  handdleClick,
  setLanguage,
  title,
  language,
}) {
  return (
    <div className="flex flex-col w-full h-full justify-center">
      <div
        className="bg-first relative rounded-lg max-md:rounded-md flex items-center h-[50px] cursor-pointer w-[350px] mb-10 mx-auto"
        onClick={handdleClick}
      >
        <div
          id="language"
          value={language}
          placeholder="Language"
          className="text-white w-full font-custom outline-none rounded-full text-center z-10"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <span className="select-none max-md:text-base">{title}</span>
        </div>
        <Arrow isOpen={isOpen} />
      </div>
      <div className="bg-white h-[65%] max-md:h-[250px] w-full max-lg:w-full relative flex justify-center font-custom rounded-lg text-xl text-white">
        <div className="absolute right-8 2xl:bottom-8 bottom-4 max-md:bottom-1 z-10">
          <Tooltip
            position={"top"}
            copiarTexto={copiarTexto}
            text={"Copiar texto"}
            icon={<Copy />}
          ></Tooltip>
        </div>
        {translation && (
          <textarea
            maxLength={520}
            id="text"
            className="w-full resize-none max-md:text-lg outline-none font-custom rounded-xl text-2xl p-8 max-md:p-4 max-md:mb-14 text-black bg-white custom-scrollbar"
            value={translation}
            readOnly
          />
        )}

        <>
          {isOpen && (
            <div
              className={`fixed top-0   
        right-0 w-full h-full flex  items-center`}
              onClick={handdleClick}
            ></div>
          )}
          <div
            className={`absolute grid transition-opacity duration-300 grid-cols-4 max-md:my-0 ${
              isOpen ? "opacity-100" : "opacity-0 z-[-1]"
            }  max-lg:whitespace-nowrap gap-4 bg-first rounded-lg p-4 max-md:gap-2 z-10 max-md:text-xs max-md:h-full shadow-lg`}
          >
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

        {text == "" ? "" : <Debounce callback={detectorText} text={text} />}

        <Debounce callback={translateText} text={text} />
      </div>
    </div>
  );
}

export default Translation;
