import React from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import About from "./About";
import Scrolls from "../../components/scroll/Scrolls";
import Today from "./Today";

export default function Home({ scrollToSection }) {
  return (
    <>
      <div className="w-full h-screen overflow-hidden ">
        <img
          src="/imgs/back.jpg"
          alt="Team Photo"
          className="w-full h-full object-cover"
        />
        <Scrolls />
      </div>
      <About className="bg-black" />
      <Today />
    </>
  );
}
