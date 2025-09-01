import { TextField, Button, Divider } from "@mui/material";
// import TitelComponents from "../components/TitelComponents";
import { homeStyles } from "./HomeCss";
import google from "../../assets/google.png"

export default function WelcomeBack() {
  const classes = homeStyles();

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
       

      <div className={classes.box} style={{width:480,height:300, backgroundColor: 'white',border:'0.09rem #dfe6e9 solid',borderRadius:10}}>
        <div style={{ fontWeight: "bolder", fontFamily: "Ubuntu", fontSize: "1.5rem", marginBottom: "8px" }}>
        <b>   Welcome back </b>
        </div>
        <div style={{ fontWeight: "lighter",fontFamily:"Ubuntu", fontSize: "0.9rem", marginBottom: "25px", color: "gray" }}>
        Keep your account safe
        </div>
        <div style={{ fontWeight: "lighter", fontSize: "0.9rem",fontFamily:"Ubuntu", marginBottom: "20px", color: "gray" }}>
           Continue as Youremail@gmail.com(not you?)
        </div>
       
        <div variant="outlined"style={{height:40,display:'flex',alignItems:'center',flexDirection:'row',width: "100%",marginBottom: "12px",textTransform: "none",color: "black",fontWeight:700,backgroundColor: "#ffffff",border:'1px solid #dcdcdc',borderRadius:5}}>
          <div style={{}}>
        <img src={google} style={{width:20,marginLeft:10 }}/>
        </div>
        <div style={{fontSize:17,marginLeft:120}}>
          Continue with Google
          </div>
        </div>
        
       
        
        <div style={{ fontWeight: "lighter",fontFamily:"Ubuntu", fontSize: "0.9rem", marginBottom: "50px", color: "gray" }}>
         JobsSpider will only use information as describe in our privacy policy.
         Google may ask for your permission to share detail with indeed like your name,
         profile picture, public profile information and email address
        </div>
        
        <div style={{ fontWeight: "lighter",fontFamily:"Ubuntu", fontSize: "0.9rem", marginBottom: "16px", color: "gray" }}>
         Sign in with login code instead 
        </div>
        
      </div>
    </div>
    </div>
  );
}