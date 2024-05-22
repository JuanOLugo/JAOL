import React from "react";
import { Button } from "@nextui-org/react";
function Create({ children }) {
  return (
    <div className="flex h-screen w-screen justify-center items-center ">
      <div className="bg-primary-200 shadow-2xl px-5 py-4 rounded-xl">
        {children}
      </div>
    </div>
  );
}

export default Create;
