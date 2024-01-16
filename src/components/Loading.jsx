import React from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const Loading = ({text}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex gap-5 items-center flex-col justify-center bg-zinc-900 bg-opacity-70 backdrop-filter backdrop-blur-sm z-50">
      <div className="text-white text-xl">{text? text: "Stay Seated, Stay Sharp. Starting Quiz In a moment!"}</div>
      <span><CgSpinnerTwoAlt className="animate-spin text-6xl text-white" /></span>
    </div>
  );
};

export default Loading;
