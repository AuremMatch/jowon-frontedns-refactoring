import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

  const location = useLocation();
  const getCurrentPath = () => location.pathname;
  const isLikesOrContestsPath =
    getCurrentPath() === "/likes" || getCurrentPath() === "/contests";

  return (
    <header
      className={`fixed top-0 w-full transition-colors duration-300 ease-in-out z-20 ${
        isLikesOrContestsPath
          ? isScroll
            ? "bg-white text-black" // 스크롤 중일 때 흰색 배경과 검은색 텍스트
            : "bg-transparent text-black" // 경로에 있을 때 투명 배경과 검은색 텍스트
          : isScroll
          ? "bg-white text-black" // 스크롤 중일 때 흰색 배경과 검은색 텍스트
          : "bg-transparent text-white" // 투명 배경과 흰색 텍스트
      }`}
    >
      <div className="flex justify-between p-8">
        <Link to="/">
          <h1
            className="text-4xl font-customFont m-3 transform hover:scale-110 hover:text-black"
            style={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            <span className="stroke-black stroke-1 font-bold">1jowon</span>
          </h1>
        </Link>
        <ul className="flex items-center">
          {menuItems.map((item, index) => (
            <MenuItem scroll={isScroll} key={index} name={item.name} />
          ))}
          <li
            onClick={toggleMenu}
            className="p-3 font-customFont text-3xl cursor-pointer flex items-center relative group transform hover:text-black hover:scale-110"
          >
            <span
              style={{
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              }}
              className="stroke-black stroke-1 font-bold"
            >
              {" "}
              My Page
            </span>
            {isOpen ? (
              <IoChevronUpOutline className="text-white" />
            ) : (
              <IoChevronDownOutline className="text-white" />
            )}
            {isOpen && <PageMenu />}
          </li>
        </ul>
      </div>
    </header>
  );
}
