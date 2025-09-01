import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import GetJobs from "./GetJobs";

export default function GetJobComponent({ data }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: -10,
    cssEase: "linear",
    // centerMode: true,
    // centerPadding: "40px",
  };

  const sref = useRef();

  const showData = () => {
    return data.map((item, index) => (
      <GetJobs key={index} item={item} />
    ));
  };
  return (
    <div>
      <Slider ref={sref} {...settings}>
        {showData()}
      </Slider>
    </div>
  );
}
