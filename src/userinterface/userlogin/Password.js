import { TextField, Button, Divider } from "@mui/material";
import { homeStyles } from "./HomeCss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postData } from "../../services/FetchNodeServices";
import Swal from 'sweetalert2';

export default function Password() {
  const classes = homeStyles();
  const navigate = useNavigate();
  const location = useSelector(state => state.user);
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!password || password.length < 6) {
      Swal.fire('Password Required', 'Please enter a password with at least 6 characters.', 'warning');
      return;
    }

    let body = {};
    if (location?.status === "Mobile") {
      body = { mobileno: location?.emailMobile, emailaddress: location?.emailaddress, password };
    } else {
      body = { mobileno: location?.emailaddress, emailaddress: location?.emailMobile, password };
    }

    const result = await postData("userinterface/insert_record", body);
    if (result.status) {
      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'Welcome to JobsSpider. You can now browse and apply for jobs.',
        timer: 1500,
        showConfirmButton: false
      });
      navigate("/");
    } else {
      Swal.fire('Registration Failed', result.message || 'Could not create account.', 'error');
    }
  };
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
    <div className={classes.root} style={{display:"flex", justifyContent:"center"}} >
        
      <div className={classes.box} style={{width:480,height:400, backgroundColor: 'white',border:'0.09rem #dfe6e9 solid',borderRadius:10}} >

        <div style={{ fontWeight: "bolder", fontFamily: "Ubuntu", fontSize: "1.5rem", marginBottom: "20px" }}>
          Create your account
        </div>
        <div style={{ fontWeight: "lighter", fontSize: "0.9rem", marginBottom: "30px", color: "gray" }}>
           sign up as {location?.emailMobile} (not you?)
        </div>
        
       
         
       
        {/* Input Section */}
        <div style={{ marginBottom: "16px",fontFamily:"Ubuntu",fontWeight:'bold'}}>
      <div style={{marginBottom:10}}>
            Password
         </div>
          <TextField
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            label="Password (min 6 characters)"
            placeholder="Password"
            fullWidth
            required
          />
        </div>
        <div style={{ fontWeight: "lighter",fontFamily:'Ubuntu', fontSize: "0.9rem", marginBottom: "16px", color: "gray" }}>
            By creating an account or signing in, you agree to JobsSpider's Terms of Service and Privacy Policy.
        </div>

        <Button
          variant="contained"
          style={{
            width: "100%",
            backgroundColor: "Blue",
            color: "#ffffff",
            textTransform: "none",
          }}
          onClick={handleSubmit}
        ><b>
          Create account
          </b>
        </Button>
      </div>
    </div>
    </div>
  );
}