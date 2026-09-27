import { Button, Paper } from "@mui/material";
import { serverURL } from "../../services/api/FetchNodeServices";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function TwoPeopleHireComponenet() {

  const [btnColor,setBtnColor]=useState('#667eea')
  const [btnBg,setBtnBg]=useState('#ffffff')
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const handleButtonEnter=()=>{
    setBtnColor("#ffffff")
    setBtnBg('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
  }
  const handleButtonLeave=()=>{
    setBtnColor('#667eea')
    setBtnBg('#ffffff')
  }
  return (
    <Paper
      elevation={4}
      style={{
        paddingTop:matches?30:50,
        paddingBottom:matches?30:50,
        paddingLeft:matches?20:40,
        paddingRight:matches?20:40,
        width: matches?"90%":"80%",
        height:matches?'auto':380,
        borderRadius: 24,
        background:
          "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
        border: `2px solid rgba(102, 126, 234, 0.2)`,
        display: "flex",
        justifyContent:matches?'space-between':'space-evenly',
        flexDirection:matches?'column-reverse':'row',
        alignItems: 'center',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(102, 126, 234, 0.1)', filter: 'blur(50px)'}}></div>
      <div style={{position: 'absolute', bottom: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(118, 75, 162, 0.1)', filter: 'blur(40px)'}}></div>

      <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:matches?30:0, position: 'relative', zIndex: 1}} >
        <img
          src={`${serverURL}/images/two-people.png`}
          alt="Two People Hiring Illustration"
          style={{maxWidth: matches?'100%':'80%', height: 'auto'}}
        />
      </div>

<div style={{display:'flex',flexDirection:'column',justifyItems:'center', position: 'relative', zIndex: 1}}>
      <div style={{ marginTop:matches?20:25 }}>
        <div
          style={{
            color: `#667eea`,
            fontSize: matches?18:22,
            fontWeight: 800,
            background: "rgba(102, 126, 234, 0.1)",
            borderRadius: 12,
            display: "flex",
            justifyContent:matches?'center':'start',
            alignItems: "center",
            padding: '8px 16px',
            letterSpacing: 1,
            textTransform: 'uppercase',
            border: '1px solid rgba(102, 126, 234, 0.3)'
          }}
        >
          JOBS SPIDER FOR EMPLOYERS
        </div>
        </div>

<div style={{ display: "flex", flexDirection: "column",alignItems:matches?'center':'start',marginTop:matches?30:40}}>
        <div
          style={{
            color: `#1a202c`,
            fontSize:matches?36: 52,
            fontWeight: 900,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: 1.2,
            fontFamily: 'Ubuntu'
          }}
        >
          Want to hire ?
        </div>

        <div
          style={{
            fontWeight: 600,
            fontSize:matches?15:18,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 12,
            color: '#4a5568',
            textAlign: matches?'center':'left',
            lineHeight: 1.5
          }}
        >
          Find the best candidate from 5 crore+ active job seekers!
        </div>

        <div style={{ marginTop: matches?25:35 }} onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave}>
          <Button
            style={{
              width:matches?'100%':320,
              textTransform: "none",
              fontSize: matches?16:18,
              fontWeight: 800,
              border: `2px solid #667eea`,
              background: btnBg,
              color:btnColor,
              borderRadius: 12,
              padding: '14px 32px',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >{`Post Job >`}</Button>
        </div>
      </div>
      </div>
    </Paper>
  );
}

