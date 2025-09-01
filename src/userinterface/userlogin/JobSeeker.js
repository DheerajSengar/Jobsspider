import * as React from 'react';
import Button from '@mui/material/Button';
import { homeStyles } from "./HomeCss";
import  Grid  from '@mui/material/Grid2';
 import welcome from '../../assets/welcome.png'
import { useNavigate,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function JobSeeker() {
    const classes = homeStyles();
  
    const navigate=useNavigate()
    const location=useSelector(state=>state.user)
    var status=location?.status
    const handleJobSeeker=()=>{
      if(status=="Mobile")
      navigate("/mobileotp")
      else
      navigate("/emailverify")

    }
  return (
    <div style={{backgroundColor:"rgb(240, 240, 240)"}}>
      <div style={{display:"flex",justifyContent:"center"}}>
    <div style={{ display: 'flex', alignItems: 'center'}} >
              <div style={{ marginRight:5,marginTop:60 }}>
                <img src='/spider.png' style={{ width: 40 }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 24,marginTop:60 }}  >
                JobsSpider
              </div>
            </div>
    </div>


    <div className={classes.root }style={{display:"flex", justifyContent:"center"}}>
      
    <div  className={classes.box} style={{width:480,height:400, backgroundColor: 'white',border:'0.09rem #dfe6e9 solid',borderRadius:10}} >
      <div style={{backgroundColor:'rgb(229, 251, 255)', height:228 ,marginBottom:10}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={welcome} style={{width:150, marginBottom: "8px",marginTop:20}}/>
      
        </div>
        
        <div style={{marginLeft:200,marginBottom:10,fontSize:24 ,color:"gray"}}><b>Welcome</b></div>
        </div>
        <div style={{ fontWeight: "bolder", fontFamily: "Ubuntu", fontSize: "16px", marginBottom: "18px" }}>
          Ready to take the next step?
        </div>
        <div style={{ fontWeight: "lighter", fontSize: "16PX", marginBottom: "16px", color: "gray" }}>
         <b>  Create an account for tools to help you </b>
        </div>
      <Grid size={12} >
        <Button style={{marginBottom:'7px', fontFamily:'Ubuntu' , borderRadius:"7px"}} fullWidth variant="outlined" onClick={handleJobSeeker}  >Jobseeker</Button>
    </Grid>
    <Grid size={12} >
        <Button style={{marginBottom:'7px', fontFamily:'Ubuntu',borderRadius:"7px"}}  fullWidth variant="outlined">Employer</Button>
    </Grid>

    </div>
    </div>
    </div>
  );
}