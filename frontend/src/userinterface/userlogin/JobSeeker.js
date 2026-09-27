import * as React from 'react';
import Button from '@mui/material/Button';
import { homeStyles } from "./HomeCss";
import  Grid  from '@mui/material/Grid2';
 import welcome from '../../assets/welcome.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function JobSeeker() {
    const classes = homeStyles();
  
    const navigate=useNavigate()
    const location=useSelector(state=>state.user)
    var status=location?.status
    const handleJobSeeker=()=>{
      if(status === "Mobile")
      navigate("/mobileotp")
      else
      navigate("/emailverify")

    }

    const handleEmployer=()=>{
      // For now, navigate to the same flow. This can be customized later
      if(status === "Mobile")
      navigate("/mobileotp")
      else
      navigate("/emailverify")
    }
  return (
    <div style={{backgroundColor:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: '100vh'}}>
      <div style={{display:"flex",justifyContent:"center", padding: '20px 0'}}>
    <div style={{ display: 'flex', alignItems: 'center'}} >
              <div style={{ marginRight: 12 }}>
                <img src='/spider.png' style={{ width: 48, height: 48 }} alt="JobsSpider Logo" />
              </div>
              <div style={{ fontWeight: 800, fontSize: 28, color: '#ffffff' }}  >
                JobsSpider
              </div>
            </div>
    </div>


    <div className={classes.root }style={{display:"flex", justifyContent:"center"}}>
      
    <div  className={classes.box} style={{width:480,height:420, backgroundColor: 'white',borderRadius:16,boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}} >
      <div style={{backgroundColor:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', height:200 ,marginBottom:20,borderRadius:'16px 16px 0 0'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center', paddingTop: 20}}>
        <img src={welcome} style={{width:120, marginBottom: "8px"}} alt="Welcome Illustration" />
      
        </div>
        
        <div style={{textAlign:'center',fontSize:28 ,color:"white",fontWeight:800}}><b>Welcome</b></div>
        </div>
        <div style={{ fontWeight: 700, fontFamily: "Ubuntu", fontSize: "18px", marginBottom: 12, textAlign: 'center', color: '#2d3748' }}>
          Ready to take the next step?
        </div>
        <div style={{ fontWeight: 400, fontSize: "14px", marginBottom: 24, color: "#718096", textAlign: 'center', padding: '0 20px' }}>
          Create an account for tools to help you find your dream job
        </div>
      <Grid size={12} >
        <Button 
          style={{
            marginBottom:'12px', 
            fontFamily:'Ubuntu',
            borderRadius:"8px",
            padding: '12px',
            fontWeight: 700,
            fontSize: '16px',
            border: '2px solid #667eea',
            color: '#667eea'
          }} 
          fullWidth 
          variant="outlined" 
          onClick={handleJobSeeker}
        >
          Jobseeker
        </Button>
    </Grid>
    <Grid size={12} >
        <Button 
          style={{
            marginBottom:'12px', 
            fontFamily:'Ubuntu',
            borderRadius:"8px",
            padding: '12px',
            fontWeight: 700,
            fontSize: '16px',
            border: '2px solid #667eea',
            color: '#667eea'
          }}
          fullWidth 
          variant="outlined"
          onClick={handleEmployer}
        >
          Employer
        </Button>
    </Grid>

    </div>
    </div>
    </div>
  );
}
