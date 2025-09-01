import { TextField, Button, Divider } from "@mui/material";
import { useState } from "react";
import { homeStyles } from "./HomeCss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
<div style={{backgroundColor:"rgb(240, 240, 240)"}}>
    
    <div className={classes.root} style={{display:"flex", justifyContent:"center"}} >
        
      <div className={classes.box} style={{width:400,height:320,backgroundColor:"white",marginTop:150,border:'0.09rem #dfe6e9 solid'}}  >

        <div style={{ fontWeight: "bolder", fontFamily: "Ubuntu", fontSize: "1.2rem",marginTop:5, marginBottom: "30px" }}>
          Add email address for <b>{location.emailMobile}</b>
        </div>
        <div style={{ fontWeight: "lighter",fontStyle:'Ubuntu', fontSize: "0.9rem", marginBottom: "30px", color: "gray" }}>
           Once you verify this email address, you'll use it to sig in and will no longer recive whatsApp message
           related to your account. Notification related to your account will be sent to this email address only.
        </div>
        
       
        
       
     
        <div style={{ marginBottom: "16px",fontFamily:"Ubuntu",fontWeight:'bold'}}>
      <div style={{marginBottom:10, fontStyle:'Ubuntu'}}>
            Email address
         </div>
          <TextField
            onChange={(e)=>setEmailAddress(e.target.value)} 
            label="Email adrress"
            placeholder="Email"
            fullWidth
            required
          />
        </div>
        

        <Button
          variant="contained"
          style={{ borderRadius:7,fontFamily:"Ubuntu",
            width: "100%",
            backgroundColor: "Blue",
            color: "#ffffff",
            textTransform: "none",
           
          }}
          onClick={handleClick}
        ><b>
          Save Email
          </b>
        </Button>
      </div>
    </div>
    </div>
  );
}