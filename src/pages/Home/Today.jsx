import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ContestCard from "../Contests/ContestCard";
import { useFetch, useFetchToday } from "../../hooks/useFetchToday";

const NextArrow = (props) => (
  <div {...props} className="slick-arrow slick-next text-white">
    <IoChevronForwardOutline size={56} className="align-middle" />
  </div>
);

const PrevArrow = (props) => (
  <div {...props} className="slick-arrow slick-prev text-white">
    <IoChevronBackOutline size={56} className="align-middle" />
  </div>
);

export default function Today() {
  const { keyword } = useParams();

  const { isLoading, error, data: today } = useFetch(); // 커스텀 훅 사용

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-black text-black p-12">
      <h1 className="font-writeFont text-5xl flex justify-center text-white">
        Popular Contest
      </h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong...</p>}
      {today && (
        <div>
          <Slider {...settings} className="p-12">
            {today.results.map((video) => (
              <div key={video.id} className="px-2">
                <ContestCard video={video}></ContestCard>
              </div>
            ))}
          </Slider>

          <Link
            to="/pictures"
            className="flex items-center justify-center blinking-text"
          >
            <h1 className="text-3xl mb-2 font-diphylleia">more</h1>
          </Link>
        </div>
      )}
    </div>
  );
}
