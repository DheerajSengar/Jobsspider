import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { homeStyles } from "./HomeCss";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
export default function Email() {
  const classes = homeStyles();
  var navigate=useNavigate()
  //var location=useLocation()
  const dispatch=useDispatch()
  var location=useSelector(state=>state.user)
  const [emailAddress,setEmailAddress]=useState('')
  const handleClick=()=>{
    var temp=location
    temp['emailaddress']=emailAddress
    dispatch({type:'ADD_USER',payload:temp})
  
    

    navigate('/emailverify')
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
    
    <div className={classes.root} style={{display:"flex", justifyContent:"center"}} >
        
      <div className={classes.box} style={{width:450,height:400,backgroundColor:"white",marginTop:20,borderRadius:16,boxShadow:'0 20px 60px rgba(0,0,0,0.3)',padding:30}}  >

        <div style={{ fontWeight: 800, fontFamily: "Ubuntu", fontSize: "20px", marginBottom: 16, textAlign: 'center', color: '#2d3748' }}>
          Add email address for <b style={{color: '#667eea'}}>{location.emailMobile}</b>
        </div>
        <div style={{ fontWeight: 400, fontFamily: "Ubuntu", fontSize: "14px", marginBottom: 32, color: "#718096", textAlign: 'center', lineHeight: 1.6 }}>
           Once you verify this email address, you'll use it to sign in and will no longer receive WhatsApp messages
           related to your account. Notifications will be sent to this email address only.
        </div>
        
        <div style={{ marginBottom: "24px",fontFamily:"Ubuntu",fontWeight:'bold'}}>
      <div style={{marginBottom:8, fontStyle:'Ubuntu', color: '#4a5568'}}>
            Email address
         </div>
          <TextField
            onChange={(e)=>setEmailAddress(e.target.value)} 
            label="Email address"
            placeholder="Enter your email"
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#e2e8f0',
                  borderRadius: 8,
                },
                '&:hover fieldset': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: 2,
                },
              },
            }}
          />
        </div>
        

        <Button
          variant="contained"
          sx={{
            borderRadius:8,
            fontFamily:"Ubuntu",
            width: "100%",
            padding: '14px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: "#ffffff",
            textTransform: "none",
            fontWeight: 700,
            fontSize: '16px',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
            }
          }}
          onClick={handleClick}
        >
          Save Email
        </Button>
      </div>
    </div>
    </div>
  );
}
