import { TextField, Button, Divider } from "@mui/material";
import google from "../../assets/google.png"
import apple from "../../assets/apple.png"
// import TitelComponents from "../components/TitelComponents";
import { homeStyles } from "./HomeCss";
import { json, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postData,generateOtp } from "../../services/FetchNodeServices";
import { useDispatch } from "react-redux";
import PasswordOtp from "./PasswordOtp";
export default function ReadyNextPage() {
  const classes = homeStyles();
  const [emailMobile,setEmailMobile]=useState('')
  const [open,setOpen]=useState(false)
  var dispatch=useDispatch()
 
 const navigate=useNavigate()
 const handleNext=async()=>{
  var result=await postData('userinterface/check_account',{emailMobile})
  alert(JSON.stringify(result))
  if(result.status)
  { alert("Account already Exist")
    if(emailMobile.includes("@"))
      { 
        status="Email"
         dispatch({type:"ADD_USER",payload:{status,emailMobile:result?.data?.emailaddress,ot:'',loginstatus:"already exist"}}) 
        setOpen(true)
        }
      else
      {status="Mobile"
       setOpen(true)
       alert("xxxx"+JSON.stringify(result.data))
        dispatch({type:"ADD_USER",payload:{status,emailMobile:result?.data?.mobileno,ot:'',loginstatus:"already exist"}}) 
      }
       
      
     


  }  
  else
  {
  var ot=generateOtp()
  var status=''
  if(emailMobile.includes("@"))
  { 
    status="Email"}
  else
  {status="Mobile"}
    dispatch({type:"ADD_USER",payload:{status,emailMobile,ot,loginstatus:"first time"}}) 
    navigate("/jobseeker")
  }
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
    <div className={classes.root} style={{display:"flex", justifyContent:"center"}}>
       

      <div className={classes.box} style={{width:480,height:500, backgroundColor: 'white',border:'0.09rem #dfe6e9 solid',borderRadius:10}}>
        <div style={{ fontWeight: "bolder", fontFamily: "Ubuntu", fontSize: "1.5rem", marginBottom: "8px" }}>
          Ready to take the next step?
        </div>
        <div style={{ fontWeight: "lighter",fontFamily:"Ubuntu", fontSize: "0.9rem", marginBottom: "16px", color: "gray" }}>
         <b>  Create an account or sign in.</b>
        </div>
        <div style={{ fontWeight: "lighter", fontSize: "0.9rem", marginBottom: "16px", color: "gray" }}>
            By creating an account or signing in, you understand and agree to Indeed's Terms.
            You also acknowledge our Cookie and Privacy policies. You will receive marketing 
            messages from Indeed and may opt out at any time by following the unsubscribe link
            in our messages, or as detailed in our terms.
        </div>
       
        <div variant="outlined"style={{height:40,display:'flex',alignItems:'center',flexDirection:'row',width: "100%",marginBottom: "12px",textTransform: "none",color: "black",fontWeight:700,backgroundColor: "#ffffff",border:'1px solid #dcdcdc',borderRadius:5}}>
          <div style={{}}>
        <img src={google} style={{width:20,marginLeft:10 }}/>
        </div>
        <div style={{fontSize:17,marginLeft:120}}>
          Continue with Google
          </div>
        </div>

        <div variant="outlined"style={{height:40,display:'flex',alignItems:'center',flexDirection:'row',width: "100%",marginBottom: "12px",textTransform: "none",color: "black",fontWeight:700,backgroundColor: "#ffffff",border:'1px solid #dcdcdc',borderRadius:5}}>
          <div style={{}}>
        <img src={apple} style={{width:25,marginLeft:10 }}/>
        </div>
        <div style={{fontSize:17,marginLeft:120}}>
          Continue with Apple
          </div>
        </div>
        
        {/* Divider */}
        <Divider style={{ margin: "16px 0", color: "#aaaaaa", fontSize: "0.9rem" }}><b>or</b></Divider>

        {/* Input Section */}
        <div style={{ fontWeight: "lighter",fontFamily:"Ubuntu", fontSize: "1rem", marginBottom: "5px", color: "black" }}>
         <b>Email address or phone number*</b>
        </div>
        <div style={{ fontWeight: "lighter",fontFamily:"Ubuntu", fontSize: "0.9rem", marginBottom: "16px", color: "gray" }}>
         If using a phone number, make sure that it is eligible to recive 
         both WhatsApp And SMS messages.
        </div>
        <div style={{ marginBottom: "20px", borderRadius:"7px"}}>
          <TextField

            placeholder="youremail@email.com or Mobileno"
            fullWidth
            required
            onChange={(e)=>setEmailMobile(e.target.value)}
          />
        </div>

        <Button
          variant="contained"
          style={{
            width: "100%",
            backgroundColor: "Blue",
            color: "#ffffff",
            textTransform: "none",
          }}
          onClick={handleNext}
        >
          <b>
          Continue →
          </b>
        </Button>
      </div>
    </div>
    <PasswordOtp open={open} setOpen={setOpen} emailMobile={emailMobile} />
    </div>
  );
}