import React from "react";

export default function ImageSection() {
  return (
    <section id="home" className="">
      <div className="relative w-full h-0" style={{ paddingBottom: "40%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/imgs/a.jpg"
            alt="Your Image Description"
            className="absolute inset-0 w-full h-full object-cover opacity-75"
            style={{}} // 스케일을 줄이고 중심 기준으로 조정
          />
          <h1
            className="absolute text-white text-7xl font-customFont font-bold"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            Contests
          </h1>
        </div>
      </div>
    </section>
  );
}
