import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import {
  IoChevronUpOutline,
  IoChevronDownOutline,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import PageMenu from "./PageMenu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운
  return (
    <header className="fixed top-0 w-full h-full">
      <div className="flex justify-between p-8">
        <Link to="/">
          <h1 className="text-3xl font-customFont m-3">1jowon</h1>
        </Link>
        <ul className="flex items-center font-customFont text-2xl">
          <li className="p-3 font-customFont text-2xl">Contests</li>
          <li className="p-3 font-customFont text-2xl">Likes</li>
          <li className="p-3 font-customFont text-2xl">Team Matching</li>
          <li
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-3 font-customFont text-2xl cursor-pointer flex items-center relative" // 부모 요소에 relative 적용
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
