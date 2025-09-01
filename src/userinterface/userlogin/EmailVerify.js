import * as React from 'react';

import Button from '@mui/material/Button';

import { homeStyles } from "./HomeCss";
import  Grid  from '@mui/material/Grid2';
 import mobile from '../../assets/mobile.png'
import { TextField } from '@mui/material';
import { generateOtp } from '../../services/FetchNodeServices';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
export default function EmailVerify() {
    const classes = homeStyles();
    const navigate=useNavigate()
    const [otp,setOtp]=useState('')
    const dispatch=useDispatch()
    var location=useSelector(state=>state.user)
    alert(JSON.stringify(location))
    useEffect(function(){
    var ot=generateOtp()  
    var temp=location
    temp['ot']=ot
    setOtp(ot)
    dispatch({type:'ADD_USER',payload:temp})



    },[])
    const handleChange=(e)=>{
      if(e.target.value.length==6)
      {
        if(otp==e.target.value && location?.status=="Mobile")
        {
          navigate("/password")
        }
        if(otp==e.target.value && location?.status=="Email")
        {
           navigate("/mobile")
        }  
        else
        {
          alert("Invalid password")
        }
      }

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
      
    <div  className={classes.box} style={{height:420,marginTop:10,backgroundColor:"white",border:'0.09rem #dfe6e9 solid'}} >
        <div style={{backgroundColor:"#74b9ff"}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={mobile} style={{width:120, height:80, marginBottom: "8px",marginTop:20}}/>
       
        </div>
        </div>
        
        <div style={{ fontWeight: "bolder", fontFamily: "Ubuntu", fontSize: "16px", marginBottom: "18px" }}>
          Enter the code
        </div>
        <div style={{ fontWeight: "lighter",fontFamily: "Ubuntu", fontSize: "16PX", marginBottom: "16px", color: "gray" }}>
        Enter the verification code sent to you on Email {location?.status=="Mobile"?<b>{location?.emailaddress}</b>:<b>{location?.emailMobile}</b>}
        </div>
      <Grid size={12} >
        <div style={{marginBottom:5}}>
       6-digit code*
       </div>
       <TextField onChange={handleChange}  label="Enter 6-digit code" fullWidth/>
    </Grid>
    <div style={{ fontWeight: "lighter",fontFamily: "Ubuntu", fontSize: "16PX", marginBottom: "16px", color: "gray" }}>
    This code will expire within 10 minutes.
       </div>

   <Grid size={12} >
       
    </Grid>
    <Grid size={12} >
        <Button style={{marginBottom:'7px',fontFamily:"Ubuntu"}} fullWidth variant="text">Resend A Code</Button>
    </Grid>
    <Grid size={12} >
        <Button style={{marginBottom:'7px',fontFamily:"Ubuntu"}} fullWidth variant="text">Not now</Button>
    </Grid>

    
    </div>
    </div>
    </div>
  );
}