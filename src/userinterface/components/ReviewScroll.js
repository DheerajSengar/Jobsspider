import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewComponent from "./ReviewComponent";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ReviewScroll({ data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const sref = useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matches ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const showReview = () => {
    return data.map((item, index) => (
      <div key={index}>
        <ReviewComponent item={item} />
      </div>
    ));
  };

  return (
    <div style={{ width: "100%" }}>
      <Slider ref={sref} {...settings}>
        {showReview()}
      </Slider>
    </div>
  );
}
 