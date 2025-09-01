import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { createRef,useRef } from "react";

import JobComponent from "./JobComponent";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ScrollComponent({data})
{  
   const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matches?1:3,
    slidesToScroll: 1,
    arrows:false,
    centerMode:true,
    centerPadding:"35px",
  };
  var sref=useRef()
   const showJobs=()=>{
    return data.map((item)=>{
    return <div><JobComponent item={item}/></div>

    })
   }
   const handleLeftArrow=()=>{
   
    sref.current.slickNext()
   }
   const handleRightArrow=()=>{
    sref.current.slickPrev()
   }
    return(<div>
        <div   style={{position:"relative"}}>
         {matches?<></>:
         <div onClick={handleLeftArrow} style={{opacity:0.8,position:'absolute',top:155,left:-18,zIndex:2, width:40,height:40,borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center',background:"#b03a84"}}>
         <KeyboardArrowLeftIcon style={{fontSize:28,color:"#fff"}} />
         </div>}
        
        <Slider ref={sref} {...settings}>
          {showJobs()}
        </Slider>
        
         {matches?<></>:<div onClick={handleRightArrow} style={{opacity:0.8,position:'absolute',top:155,right:-18,zIndex:2, width:40,height:40,borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center',background:"#b03a84"}}>
         <KeyboardArrowRightIcon style={{fontSize:28,color:"#fff"}} />
         </div>
              }
         </div>
        
    </div>)
}