import React from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { Element } from "react-scroll";
import Scrolls from "../../components/scroll/Scrolls";

export default function About({ scrollToSection }) {
  return (
    <Element name="about" className="bg-black p-24">
      <div className="flex">
        <img src="imgs/about.png" alt="" className="w-1/2 h-1/2" />
        <div className="text-white text-lg flex items-center flex-col justify-center ml-8 font-diphylleia leading-10 text-center">
          <div className="flex justify-center text-2xl font-bold mb-4 font-customFont">
            steven jobs - "나의 최고의 작품은 팀이다" <br />
          </div>
          이 홈페이지는 열정적인 활동을 하고 싶지만
          <br /> 같이 뜻을 모을 사람이 부족한 사람들을 위한 사이트입니다
          <br /> 팀원 매칭을 통해 자신에게 적합한 팀원들을 만나볼 수 있으며
          <br />
          뜻이 맞는 팀원들과 적합한 대회와 활동을 통해 최고의 프로젝트를
          <br />
          만들어주는 홈페이지 입니다 또한 여러 필터와 <br /> 카테고리를 통해
          쉽고 빠르게 대회들을 찾아볼 수 있으며
          <br /> 1조원 그래프를 통해 팀에서 부족한 스택인원을 멋지게 보충할수
          있습니다.
        </div>
      </div>
      <Scrolls />
    </Element>
  );
}
