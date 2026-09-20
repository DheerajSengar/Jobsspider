import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import JobComponent from "./JobComponent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ScrollComponent({ data = [] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const sref = useRef();

  const settings = {
    dots: false,
    infinite: data.length > 3,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: isMobile,
    centerPadding: isMobile ? "20px" : "0px",
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const showJobs = () => {
    return data.map((item, index) => (
      <div key={item.companyid || index}>
        <JobComponent item={item} />
      </div>
    ));
  };

  const handleLeftArrow = () => {
    sref.current?.slickPrev();
  };

  const handleRightArrow = () => {
    sref.current?.slickNext();
  };

  return (
    <div style={{ position: "relative", width: "100%", padding: "10px 0" }}>
      {!isMobile && data.length > 3 && (
        <>
          {/* Left Navigation Button */}
          <div
            onClick={handleLeftArrow}
            style={{
              position: "absolute",
              top: "50%",
              left: -20,
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#b03a84",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(176, 58, 132, 0.4)",
              cursor: "pointer",
              transition: "transform 0.2s ease, background-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
          >
            <KeyboardArrowLeftIcon style={{ fontSize: 28 }} />
          </div>

          {/* Right Navigation Button */}
          <div
            onClick={handleRightArrow}
            style={{
              position: "absolute",
              top: "50%",
              right: -20,
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#b03a84",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(176, 58, 132, 0.4)",
              cursor: "pointer",
              transition: "transform 0.2s ease, background-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
          >
            <KeyboardArrowRightIcon style={{ fontSize: 28 }} />
          </div>
        </>
      )}

      <Slider ref={sref} {...settings}>
        {showJobs()}
      </Slider>
    </div>
  );
}
