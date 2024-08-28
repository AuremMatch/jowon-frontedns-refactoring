import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ContestCard from "../Contests/ContestCard";

const NextArrow = (props) => (
  <div {...props} className="slick-arrow slick-next">
    <IoChevronForwardOutline size={56} className="align-middle" />
  </div>
);

const PrevArrow = (props) => (
  <div {...props} className="slick-arrow slick-prev">
    <IoChevronBackOutline size={56} className="align-middle" />
  </div>
);

export default function Today() {
  const { keyword } = useParams();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/contests/");
        return response.data;
      } catch (error) {
        throw new Error("Network response was not ok");
      }
    },
  });
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
    <div className="bg-white text-black p-12">
      <h1 className="font-customFont text-5xl flex justify-center">
        Popular Contest
      </h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong...</p>}
      {videos && (
        <div>
          <Slider {...settings} className="p-12">
            {videos.results.map((video) => (
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
