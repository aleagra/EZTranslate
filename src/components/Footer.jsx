import React from "react";
import { Github, Linkedin } from "../icons";
import { WorldPortafolio } from "../icons/WorldPortafolio";

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

  function Element({ nombre, urlLinkedin, urlGit, urlPortafolio }) {
    return (
      <div className="w-full flex items-center">
        {elements.map((element, index) => (
          <div key={index} className="w-[50%] flex flex-col items-center gap-2">
            <h1>{element.nombre}</h1>
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
        ))}
      </div>
    );
  }


  return (
    <div className="w-full absolute flex justify-center h-[100px] bottom-0 bg-second text-white">
      <Element />
    </div>
  );
};
