import React, { useState } from "react";
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

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="fixed top-0 w-full h-full bg-opacity-0">
      <div className="flex justify-between p-8">
        <Link to="/">
          <h1 className="text-3xl font-customFont m-3 transition duration-300 ease-in-out transform hover:text-pink-800 hover:scale-110">
            1jowon
          </h1>
        </Link>
        <ul className="flex items-center">
          {menuItems.map((item, index) => (
            <MenuItem key={index} name={item.name} />
          ))}
          <li
            onClick={toggleMenu}
            className="p-3 font-customFont text-2xl cursor-pointer flex items-center relative"
          >
            My Page
            {isOpen ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
            {isOpen && <PageMenu />}
          </li>
        </ul>
      </div>
    </header>
  );
}
