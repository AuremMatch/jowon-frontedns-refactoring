import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import PageMenu from "./PageMenu";
import MenuItem from "./MenuItem";

const menuItems = [
  { name: "Contests" },
  { name: "Likes" },
  { name: "Team Matching" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header
      className={`fixed top-0 w-full   ${
        isScroll ? "bg-white text-black" : "bg-transparent text-white"
      }`}
    >
      <div className="flex justify-between p-8 ">
        <Link to="/">
          <h1 className="text-3xl text-white font-customFont m-3 transition duration-300 ease-in-out transform group-hover:text-black hover:scale-110">
            <span className="stroke-black stroke-1 font-bold">1jowon</span>
          </h1>
        </Link>
        <ul className="flex items-center">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              name={item.name}
              className="group-hover:text-black"
            />
          ))}
          <li
            onClick={toggleMenu}
            className="p-3 font-customFont text-2xl cursor-pointer flex items-center relative text-white group-hover:text-black"
          >
            <span className="stroke-black stroke-1 font-bold"> My Page</span>
            {isOpen ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
            {isOpen && <PageMenu />}
          </li>
        </ul>
      </div>
    </header>
  );
}
