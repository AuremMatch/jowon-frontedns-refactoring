import React from "react";
import { BsChevronDoubleDown } from "react-icons/bs";

export default function Home({ scrollToSection }) {
  return (
    <div className="w-full h-screen overflow-hidden ">
      <img
        src="/imgs/back.jpg"
        alt="Team Photo"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center blinking-text p-3 cursor-pointer font-customFont text-3xl text-white transition duration-300 ease-in-out hover:text-black hover:scale-110 group-hover:text-black">
        <span className="stroke-black stroke-3 font-bold"> Scroll</span>
        <BsChevronDoubleDown className="text-3xl mt-4" />
      </div>
    </div>
  );
}
