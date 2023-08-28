import { Arrow, Copy, World } from "../icons";
import { Debounce } from "../services";
import LanguageText from "./LanguageText";
import Tooltip from "./Tooltip";

/* eslint-disable react/prop-types */
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
        className="bg-first relative rounded-lg max-md:rounded-md flex items-center h-[50px] cursor-pointer w-[350px] mb-10 mx-auto max-md:top-6"
        onClick={handdleClick}
      >
        <World />
        <div
          id="language"
          value={language}
          placeholder="Language"
          className="text-white w-full font-custom outline-none rounded-full text-center"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <span className=" select-none max-md:text-base">{title}</span>
        </div>
        <Arrow />
      </div>
      <div className="bg-white h-[65%] max-md:h-[250px] w-full max-lg:w-full relative flex justify-center font-custom rounded-lg text-xl text-white">
        <div className="absolute right-12 bottom-8">
          <Tooltip
            position={"top"}
            copiarTexto={copiarTexto}
            icon={<Copy />}
          ></Tooltip>
        </div>
        {translation && (
          <textarea
            maxLength={520}
            id="text"
            className="w-full resize-none outline-none font-custom rounded-xl text-2xl p-8 text-black border shadow-sm border-black/10 bg-white"
            value={translation}
            readOnly
          />
        )}

        {isOpen && (
          <>
            <div className="absolute grid grid-cols-4 max-lg:grid-cols-3 max-lg:whitespace-nowrap gap-4 max-md:border-none  bg-first rounded-lg p-4 shadow-lg">
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

        <Debounce translateText={detectorText} text={text} />
        <Debounce translateText={translateText} text={text} />
      </div>
    </div>
  );
}

export default Translation;
