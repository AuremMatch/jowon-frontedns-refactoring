import React from "react";
import { IoLogoInstagram, IoLogoFacebook, IoLogoGithub } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="bg-black text-white">
      {/* 소셜 미디어 아이콘 섹션 */}
      <div className="flex justify-end p-3">
        <IoLogoInstagram className="text-5xl md:text-7xl p-3 hover:text-pink-800 transition duration-300 hover:scale-110" />
        <IoLogoFacebook className="text-5xl md:text-7xl p-3 hover:text-blue-800 transition duration-300 hover:scale-110" />
        <IoLogoGithub className="text-5xl md:text-7xl p-3 hover:text-gray-400 transition duration-300 hover:scale-110" />
      </div>

      {/* 팀 매칭 소개 섹션 */}
      <div className="p-6 text-center border-t border-gray-700">
        <h2 className="text-2xl md:text-3xl font-bold">
          풀스택 프로젝트 팀 매칭
        </h2>
        <p className="text-lg md:text-xl mt-4">
          풀스택 개발을 꿈꾸는 개발자들을 위한 최적의 팀 매칭 플랫폼입니다. 함께
          성장하고 협력할 수 있는 팀원을 찾고, 함께 프로젝트를 완성해 보세요.
        </p>
        <p className="text-lg md:text-xl mt-2">
          프로젝트에 함께할 팀원을 찾고 있다면, 지금 바로 팀 매칭을 시작하세요!
        </p>
        <div className="mt-4">
          <a
            href="mailto:contact@yourwebsite.com"
            className="text-blue-400 hover:text-blue-500"
          >
            www.1jowon.com
          </a>
        </div>
      </div>

      {/* 하단 개발자 정보 섹션 */}
      <div className="p-4 text-center border-t border-gray-700">
        <p>개발자: 윤동규 | 김민혁 | 장준호</p>
      </div>
    </div>
  );
}
