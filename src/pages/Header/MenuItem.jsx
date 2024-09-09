import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "../../components/Modal/LoginModal";

export default function MenuItem({ name, scroll, color, className = "" }) {
  const location = useLocation();
  const path = `/${name.toLowerCase()}`;
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Determine if the current path is "/likes"
  const isLikesPath =
    location.pathname === "/likes" || location.pathname === "/contests";

  // Determine the final text color
  const textColor = isLikesPath
    ? "text-black"
    : color
    ? color
    : scroll
    ? "text-black"
    : "text-white";

  return (
    <>
      {name.toLowerCase() === "login" ? (
        <div
          onClick={openModal}
          className={`p-3 cursor-pointer font-customFont text-3xl transition duration-200 ease-in-out transform hover:text-black hover:scale-110 ${textColor} ${className}`}
        >
          <p
            style={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
            className="stroke-black stroke-3 font-bold"
          >
            {name}
          </p>
        </div>
      ) : (
        <Link
          to={path}
          className={`p-3 cursor-pointer font-customFont text-3xl transition duration-200 ease-in-out transform hover:text-black hover:scale-110 ${textColor} ${className}`}
        >
          <p
            style={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
            className="stroke-black stroke-3 font-bold"
          >
            {name}
          </p>
        </Link>
      )}
      {name.toLowerCase() === "login" && (
        <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
      )}
    </>
  );
}
