import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import PageMenu from "./PageMenu";
import MenuItem from "./MenuItem";

import { BsSun, BsMoon } from "react-icons/bs";

const menuItems = [
  { name: "Contests" },
  { name: "Likes" },
  { name: "TeamMatching" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [isSun, setIsSun] = useState(true); // 초기값은 Sun으로 설정

  const toggleIcon = () => {
    setIsSun(!isSun); // 클릭 시 상태 변경
  };

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
            ? "bg-black text-black" // 스크롤 중일 때 흰색 배경과 검은색 텍스트
            : "bg-transparent text-black" // 경로에 있을 때 투명 배경과 검은색 텍스트
          : isScroll
          ? "bg-black text-black" // 스크롤 중일 때 흰색 배경과 검은색 텍스트
          : "bg-transparent text-white" // 투명 배경과 흰색 텍스트
      }`}
    >
      <div className="flex justify-between p-8">
        <Link to="/">
          <h1
            className="text-4xl font-writeFont m-3  hover:text-black"
            style={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            <span className="stroke-black stroke-1 font-bold flex items-center">
              <div
                style={{
                  transition: "transform 0.5s ease, opacity 0.5s ease", // 천천히 변화
                }}
                className="text-[40px] hover:scale-110 hover:text-yellow-500 transition-transform duration-500 cursor-pointer" // hover 시 확대 + 노란색
                onClick={toggleIcon} // 클릭 이벤트
              >
                {isSun ? <BsSun /> : <BsMoon />}
              </div>
              <span className="ml-2">Aurem</span>
            </span>
          </h1>
        </Link>
        <ul className="flex items-center">
          {menuItems.map((item, index) => (
            <MenuItem scroll={isScroll} key={index} name={item.name} />
          ))}
          <li
            onClick={toggleMenu}
            className="p-3 font-writeFont text-3xl cursor-pointer flex items-center relative group transform hover:text-black "
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
              <IoChevronUpOutline
                className="text-white"
                style={{
                  filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))",
                }}
              />
            ) : (
              <IoChevronDownOutline
                className="text-white"
                style={{
                  filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))",
                }}
              />
            )}
            {isOpen && <PageMenu />}
          </li>
        </ul>
      </div>
    </header>
  );
}
