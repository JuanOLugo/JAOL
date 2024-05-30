import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { navThings } from "../../libs/NavThings";
import Inicio from "./Inicio";
function Navbar({ setNavOpen, navOpen, Items, setItems }) {
  const handleNavClick = () => {
    setNavOpen(!navOpen);
  };


  return (
    <div className={`h-screen flex flex-col justify-around transition-all duration-150 mx-10   ${!navOpen ? " w-0 translate-x-[-99rem]" : "translate-x-0"} `}>
      <button className="text-4xl mx-auto" onClick={handleNavClick}>
        <RxHamburgerMenu />
      </button>
      <div className={`h-[70%]  flex flex-col justify-evenly  `}>
        <div>
          <div>
            <h1 className="text-6xl font-bold">JAOL</h1>
          </div>
        </div>
        <div>
          {navThings.map((items, key) => {
            return (
              <div
                key={key + 5 / 2}
                className={`my-5 text-2xl font-light ${
                  items.color ? items.color : null
                }`}
              >
                <button onClick={() => {
                  if(items.action === "inicio") setItems({...items, inicio: true});
                  if(items.action === "clients") setItems({...items, clientes: true});
                  if(items.action === "contable") setItems({...items, contabilidad: true});
                }}>{items.name}</button>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
