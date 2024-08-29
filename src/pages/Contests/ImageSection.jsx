import React from "react";

export default function ImageSection() {
  return (
    <section id="home" className="">
      <div className="relative w-full h-0" style={{ paddingBottom: "40%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/imgs/pic.jpg"
            alt="Your Image Description"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-black text-7xl font-dongle font-bold">
            대회목록
          </h1>
        </div>
      </div>
    </section>
  );
}
