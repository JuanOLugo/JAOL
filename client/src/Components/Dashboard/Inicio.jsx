import React from "react";
import StorebasicInfo from "./StorebasicInfo";
import UservInfoView from "./UservInfoView";
function Inicio() {
  return (
    <div className="flex items-center h-full justify-between ">
      <div className="h-full lg:w-[80%] w-full rounded-s-xl">
        <StorebasicInfo />
      </div>
      <div className="h-full w-[20%] lg:block hidden bg-primary-200 rounded-e-xl">
        <UservInfoView />
      </div>
    </div>
  );
}

export default Inicio;
