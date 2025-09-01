import * as React from 'react';

import Button from '@mui/material/Button';

import { homeStyles } from "./HomeCss";
import  Grid  from '@mui/material/Grid2';
 import mobile from '../../assets/mobile.png'
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 
export default function Mobile() {
    const [mobileno,setMobileNo]=useState()
    const navigate=useNavigate()
  const classes=homeStyles()
  const dispatch=useDispatch()
    var location=useSelector(state=>state.user)
  
    const handleClick=()=>{
      var temp=location
      temp['emailaddress']=mobileno
      dispatch({type:'ADD_USER',payload:temp})
      navigate("/mobileotp")
    }

  return (

    <div style={{backgroundColor:"rgb(240, 240, 240)"}}>
      <div style={{display:"flex",justifyContent:"center"}}>
    <div style={{ display: 'flex', alignItems: 'center'}} >
              <div style={{ marginRight:5,marginTop:100 }}>
                <img src='/spider.png' style={{ width: 40 }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 24,marginTop:100 }}  >
                JobsSpider
              </div>
            </div>
    </div>

    <div className={classes.root }style={{display:"flex", justifyContent:"center"}}>
      
    <div  className={classes.box} style={{height:530,marginTop:10, backgroundColor: 'white', border:'0.09rem #dfe6e9 solid',borderRadius:10}} >
        <div style={{backgroundColor:"#74b9ff" }}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={mobile} style={{width:120, height:80, marginBottom: "8px",marginTop:20}}/>
       
        </div>
        </div>
        
        <div style={{ fontWeight: "bolder", fontFamily: "Ubuntu", fontSize: "16px", marginBottom: "18px" }}>
          Verify your phone number
        </div>
        <div style={{ fontWeight: "lighter", fontSize: "16PX", marginBottom: "16px", color: "gray" }}>
        To enhance your experience, we need to verify that the
         phone number associated with your account 
        belongs to you. A code will be sent to this number for verification
        </div>
      {/* <Grid size={12} >
       <TextField label="mobileno" fullWidth/>
    </Grid> */}
<div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", padding: "5px" }}>
      <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
          alt="India Flag"
          style={{ width: "24px", height: "16px", marginRight: "5px" }}
        />
        <span style={{ fontWeight: "bold" }}>+91</span>
      </div>
      <input
        type="text"
        placeholder="Enter phone number"
        onChange={(e)=>setMobileNo(e.target.value)}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: "16px",
        }}
      />
    </div>

    <div style={{ fontWeight: "lighter", fontSize: "16PX", marginBottom: "16px", color: "gray" }}>
      <p>
    By adding my phone number, I consent to receive calls including artificial or procecorded calls
     from indeed on the phone number provided l also agree to receive
     texts for phone number verification purposes and as specified in my Communications settings.
     </p>
     <p>
    If you want to change your contact number, visit your Profile. Changes to your phone 
    number on this page will not be reflected in your profile
    </p>
   </div>

   <Grid size={12} >
        <Button style={{marginBottom:'7px', borderRadius:5}} fullWidth variant="contained" onClick={handleClick} >Verify</Button>
    </Grid>
    <Grid size={12} >
        <Button  fullWidth variant="text">Not now</Button>
    </Grid>
    </div>
    </div>
    </div>
  );
}