import { Github, Linkedin, WorldPortafolio } from "../icons";
import { Info } from "../services";

export const Footer = () => {
  function Element() {
    return (
      <div className="w-full justify-between flex items-center">
        {Info.map((element, index) => (
          <div className="w-[100%] flex justify-center" key={index}>
            <div className="flex items-center gap-2  max-lg:flex-col">
              <h4 className="font-bold max-md:text-sm">{element.nombre}</h4>
              <div className="flex gap-3">
                <a
                  target="_blank"
                  href={element.urlLinkedin}
                  className="hover:scale-125 ease-in duration-300"
                  rel="noreferrer"
                  aria-label={`Perfil de LinkedIn de ${element.name}`}
                >
                  <Linkedin />
                </a>
                <a
                  target="_blank"
                  href={element.urlGit}
                  className="hover:scale-125 ease-in duration-300"
                  rel="noreferrer"
                  aria-label={`Perfil de GitHub de ${element.name}`}
                >
                  <Github />
                </a>
                <a
                  target="_blank"
                  href={element.urlPortafolio}
                  className="hover:scale-125 ease-in duration-300"
                  rel="noreferrer"
                  aria-label={`Portafolio de ${element.name}`}
                >
                  <WorldPortafolio />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full absolute bottom-0 flex justify-center h-[80px] bg-first border-t border-white/20 text-white">
      <Element />
    </div>
  );
};
