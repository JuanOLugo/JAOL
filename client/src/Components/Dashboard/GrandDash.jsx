import React from "react";
import { IoMdClose } from "react-icons/io";
function GrandDash({ setNavOpen, navOpen }) {

    const handleNavClick = () => {
        setNavOpen(!navOpen);
      };

  return (
    <div className={` bg-red-300 transition-all duration-200 ${navOpen ? "w-4/5 " : "w-11/12"} `}>
      <button className={`text-5xl transition-all duration-200 ${navOpen ? "translate-y-[-99rem]" : "translate-y-0"}`} onClick={handleNavClick}>
        <IoMdClose />
      </button>
    </div>
  );
}

export default GrandDash;
