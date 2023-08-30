import { useState } from "react";

const Tooltip = ({ position, copiarTexto, icon, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipContent, setTooltipContent] = useState(text);
  const tool = () => {
    setTooltipContent("¡Texto copiado!");
  };

  let resetTimeout;

  const resetTooltipContent = () => {
    resetTimeout = setTimeout(() => {
      setTooltipContent(text);
    }, 10);
  };

  return (
    <div
      id="tooltip"
      className="relative h-fit cursor-pointer group"
      onMouseEnter={() => {
        setIsHovered(true);
        clearTimeout(resetTimeout);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        clearTimeout(resetTimeout);
        setTimeout(() => {
          resetTooltipContent();
        }, 500);
      }}
    >
      <div
        className="my-1 hover:bg-[#f2f4f7] p-2 rounded-md active:bg-slate-200 transition-colors duration-500"
        onClick={() => {
          copiarTexto && copiarTexto();
          copiarTexto && tool();
        }}
      >
        {icon}
      </div>
      <span
        onMouseEnter={() => setIsHovered(false)}
        className={`absolute bg-first rounded-md text-white text-sm p-2 whitespace-nowrap select-none ${
          position === "top"
            ? "left-1/2 -translate-x-1/2 bottom-[calc(100%+5px)] "
            : ""
        }
        ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"} 
        transition-opacity duration-500`}
      >
        {tooltipContent}
      </span>
      <span
        className={`absolute ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        } border-[6px] transition-opacity duration-500 ${
          position === "top"
            ? "left-1/2 -translate-x-1/2 bottom-full border-l-transparent border-r-transparent border-b-0 border-t-first"
            : ""
        }`}
      ></span>
    </div>
  );
};

export default Tooltip;
