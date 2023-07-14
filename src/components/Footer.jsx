import React from "react";
import { Github, Linkedin } from "../icons";
import { WorldPortafolio } from "../icons/WorldPortafolio";

export const Footer = () => {
    //SON LAS 2 DE LA MANANA Y ALTA PAJA HACER LAS FUNCIONES DESPUES LO HAGO
  return (
    <div className="w-full absolute flex justify-center h-[100px] bottom-0 bg-second text-white">
      <div className="w-full flex items-center">
        <div className="w-[50%] flex flex-col items-center gap-2">
          <h1>Juan Pablo Moscoloni</h1>
          <div className="flex gap-3">
            <a href="" className="hover:scale-125 ease-in duration-300">
              <Linkedin />
            </a>
            <a href="" className="hover:scale-125 ease-in duration-300">
              <Github />
            </a>
            <a href="" className="hover:scale-125 ease-in duration-300">
              <WorldPortafolio />
            </a>
          </div>
        </div>
        <div className="w-[50%] flex flex-col items-center gap-2">
          <h1>Alejandro Agra</h1>
          <div className="flex gap-3">
            <a href="" className="hover:scale-125 ease-in duration-300">
              <Linkedin />
            </a>
            <a href="" className="hover:scale-125 ease-in duration-300">
              <Github />
            </a>
            <a href="" className="hover:scale-125 ease-in duration-300">
              <WorldPortafolio />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
