import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import UservInfoView from "./UservInfoView";
import StorebasicInfo from "./StorebasicInfo";
import { UserContext } from "../../Context/UserContext";
import Wait from "../Wait";
import { StoreContext } from "../../Context/StoreContext";
import Inicio from "./Inicio";
function GrandDash({ setNavOpen, navOpen, Items }) {
  const { myAccount } = useContext(UserContext);
  const { myStores } = useContext(StoreContext);
  const handleNavClick = () => {
    setNavOpen(!navOpen);
  };

  return (
    <>
      {!myAccount && !myStores ? (
        <Wait />
      ) : (
        <div
          className={` transition-all bg-white rounded-xl shadow-2xl h-[90%]  duration-500 ${
            navOpen ? "w-4/5 " : "w-11/12"
          } `}
        >
          <div className="h-full ">
            <button
              className={`text-5xl transition-all absolute bg-slate-100 p-1 shadow-md  rounded-full  duration-500 ${
                navOpen
                  ? "translate-y-[-99rem] translate-x-4"
                  : "translate-y-2 translate-x-4"
              }`}
              onClick={handleNavClick}
            >
              <IoMdClose />
            </button>
            <>
              {Items.inicio ? <Inicio /> : "" }
              {Items.clientes ? <h1>Clientes</h1> : "" }
              {Items.contabilidad ? <h1>Contabilidad</h1> : "" }

            </>
          </div>
        </div>
      )}
    </>
  );
}

export default GrandDash;
