import { Button, Paper } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function TwoPeopleHireComponenet() {

  const [btnColor,setBtnColor]=useState('rgb(31, 130, 104)')
  const [btnBg,setBtnBg]=useState('#ffff')
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const handleButtonEnter=()=>{
    setBtnColor("#ffff")
    setBtnBg('rgb(31, 130, 104)')
  }
  const handleButtonLeave=()=>{
    setBtnColor('rgb(31, 130, 104)')
    setBtnBg('#ffff')
  }
  return (
    <Paper
      style={{
        paddingTop:45,
        width: matches?"90%":"80%",
        height:matches?'auto':350,
        borderRadius: 18,
        background:
          "linear-gradient(298deg, rgba(218,251,242,1) 3%, rgba(248,243,243,0.6783963585434174) 100%)",
        border: `1px solid #e5e7eb`,
        display: "flex",
        justifyContent:matches?'space-between':'space-evenly',
        flexDirection:matches?'column-reverse':'row'
      }}
    >

     
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:matches?45:0}} >
        <img
          src={`${serverURL}/images/two-people.png`}
        />
      </div>

<div style={{display:'flex',flexDirection:'column',justifyItems:'center'}}>
      <div style={{ marginTop:15 }}>
        <div
          style={{
            color: `rgb(31 130 104)`,
            opacity: 0.8,
            fontSize: 22,
            fontWeight: 700,
            background: "#f1f2f6",
            borderRadius: 7,
            display: "flex",
            justifyContent:matches?'center':'start',
            alignItems: "center",
          }}
        >
          JOBS SPIDER FOR EMPLOYERS
        </div>
        </div>

<div style={{ display: "flex", flexDirection: "column",alignItems:matches?'center':'start',marginTop:40}}>
        <div
          style={{
            color: `rgb(0 95 62 )`,
            fontSize:matches?40: 50,
            fontWeight: "bolder",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Want to hire ?
        </div>

        <div
          style={{
            fontWeight: 'bold',
            opacity:0.9,
            fontSize:16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          Find the best candidate from 5 crore+ active job seekers!
        </div>

        <div style={{ marginTop: matches?30:40 }} onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave}>
          <Button
            style={{
              width:matches?400:300,
              textTransform: "capitalize",
              fontSize: 18,
              fontWeight: "bold",
              border: `1px solid rgb(31, 130, 104)`,
              background: btnBg,
              color:btnColor,
            }}
          >{`Post Job >`}</Button>
        </div>
      </div>
      </div>
    </Paper>
  );
}
