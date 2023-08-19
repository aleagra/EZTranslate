import { Arrow, Copy, World } from "../icons";
import { Debounce } from "../services";
import LanguageText from "./LanguageText";

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
    <div className="flex flex-col w-full h-full">
      <div
        className="bg-[#3355c7] relative rounded-lg max-md:rounded-md flex items-center h-[50px] cursor-pointer w-[350px] mb-10 mx-auto max-md:top-6"
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
      <div className="max-md:h-[45%] w-full h-[82%] max-lg:p-4 overflow-x-hidden break-words max-lg:w-full relative flex justify-center font-custom rounded-lg text-xl p-8 bg-white max-md:rounded-md">
        <div
          onClick={copiarTexto}
          className="hover:bg-[#ebecf1] p-4 max-md:p-2 rounded-full w-fit absolute bottom-6 max-md:right-4 max-md:bottom-4 right-10 active:bg-first active:transition-colors cursor-pointer"
        >
          <Copy />
        </div>

        {translation && (
          <textarea
            maxLength={520}
            id="text"
            className="w-full max-lg:h-[220px] resize-none outline-none font-custom rounded-xl text-xl max-md:px-4 text-black bg-white"
            value={translation}
            readOnly
          />
        )}

        {isOpen && (
          <>
            <div className="absolute grid grid-cols-4 max-lg:grid-cols-3 max-lg:whitespace-nowrap gap-4 max-md:border-none  bg-[#3355c7] rounded-lg p-4 shadow-lg">
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
