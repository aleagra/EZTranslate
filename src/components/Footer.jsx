import { Github, Linkedin, WorldPortafolio } from "../icons";

export const Footer = () => {
  const elements = [
    {
      nombre: "Juan Pablo Moscoloni",
      urlLinkedin:
        "https://www.linkedin.com/in/juan-pablo-moscoloni-53a8b9245/",
      urlGit: "https://github.com/JuanpyMoscoloni",
      urlPortafolio: "https://juanpyportafolio.netlify.app",
    },
    {
      nombre: "Alejandro Agra",
      urlLinkedin: "https://www.linkedin.com/in/alejandro-agra/",
      urlGit: "https://github.com/aleagra",
      urlPortafolio: "https://ale-agra.web.app/",
    },
  ];

  function Element() {
    return (
      <div className="w-full justify-between flex items-center">
        {elements.map((element) => (
          <div className="w-[100%] flex justify-center" key={element}>
            <div className="flex items-center gap-2  max-lg:flex-col">
              <h1 className="font-bold">{element.nombre}</h1>
              <div className="flex gap-3">
                <a
                  href={element.urlLinkedin}
                  className="hover:scale-125 ease-in duration-300"
                >
                  <Linkedin />
                </a>
                <a
                  href={element.urlGit}
                  className="hover:scale-125 ease-in duration-300"
                >
                  <Github />
                </a>
                <a
                  href={element.urlPortafolio}
                  className="hover:scale-125 ease-in duration-300"
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
    <div className="w-full absolute flex justify-center h-[70px] bottom-0 bg-second text-white">
      <Element />
    </div>
  );
};
