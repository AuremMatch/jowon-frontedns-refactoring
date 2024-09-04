import React from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { Element } from "react-scroll";
import Scrolls from "../../components/scroll/Scrolls";
import Slider from "react-slick";

export default function About() {
  const settings = {
    dots: true, // 슬라이드 하단의 도트 표시
    infinite: true, // 슬라이드가 무한 반복되도록 설정
    speed: 500, // 슬라이드 애니메이션 속도 (500ms)
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번에 넘어갈 슬라이드 개수
    autoplay: true, // 자동 슬라이드 활성화
    autoplaySpeed: 5000, // 3초마다 슬라이드 전환
    arrows: false, // 좌우 화살표 비활성화
    pauseOnHover: false, // 마우스 오버 시 슬라이드 멈춤 비활성화
  };

  return (
    <Element name="about" className="bg-black p-24">
      <div className="flex">
        <img src="imgs/about.png" alt="" className="w-1/2 h-1/2" />
        <Slider {...settings} className="w-1/2">
          <div>
            <div className="flex flex-col text-left">
              <div className="text-white text-left text-lg flex items-center flex-col justify-center ml-8 font-diphylleia leading-10">
                대학생활의 꽃{" "}
                <p className="font-bold text-2xl inline">"프로젝트"</p>
                <br />
                진정한 대학생활은 학교에서 배운 내용으로 누군가를
                <br />
                <span className="font-bold text-2xl inline">
                  "도울 수 있을 때"
                </span>{" "}
                <span style={{ marginLeft: "0.5rem" }}>
                  보람을 느낀다고 생각합니다
                </span>
                <br />
                <span>
                  하지만 저학년이거나 프로젝트 초보일 경우 기술 스택은 한정되어
                  있고
                </span>
                <span className="font-bold text-2xl inline">"완성된"</span>{" "}
                <span> 프로젝트를 하기엔 한계가 있습니다</span>
                <br />
                <span>이를 위해 1조원앱을 통해 나의 부족한 기술 스택을</span>
                <span className="font-bold text-2xl inline">
                  "보충해 줄 수 있는"
                </span>{" "}
                <span> 팀원을 찾을 수 있으며</span>
                <br />
                이로써 대학생활에서 여러분의 최고의 작품을 만들고 자랑해보세요
              </div>
            </div>
          </div>
          <div>
            <div className="flex text-2xl justify-center font-bold mb-4 mt-12 font-customFont text-left">
              Steven Jobs - "나의 최고의 작품은 팀이다. 훌륭한 팀 없이는 어떤
              것도 이룰 수 없다." ("My greatest work is the team. Without a
              great team, nothing can be accomplished.")
              <br />
              <br />
              헨리 포드 (Henry Ford) - "함께 모이는 것은 시작이고, 함께 머무는
              것은 발전이며, 함께 일하는 것은 성공이다." ("Coming together is a
              beginning, staying together is progress, and working together is
              success.")
              <br />
              <br />
              마이클 조던 (Michael Jordan) - "재능은 경기를 이기게 하지만,
              팀워크와 지성은 챔피언십을 이기게 한다." ("Talent wins games, but
              teamwork and intelligence win championships.")
              <br />
              <br />
              앤드류 카네기 (Andrew Carnegie) - "팀워크는 평범한 사람들을 비범한
              결과로 이끌 수 있는 능력이다." ("Teamwork is the ability to work
              together toward a common vision. It is the fuel that allows common
              people to attain uncommon results.")
            </div>
          </div>
        </Slider>
      </div>
      <Scrolls />
    </Element>
  );
}
