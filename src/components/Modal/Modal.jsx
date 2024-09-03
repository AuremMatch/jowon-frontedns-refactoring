import React from "react";

export function Modal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg relative  w-full max-w-4xl  h-4/5 overflow-y-auto ">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
