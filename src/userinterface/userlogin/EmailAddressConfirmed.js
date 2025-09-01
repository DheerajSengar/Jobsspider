import { Button} from "@mui/material";

import { homeStyles } from "./HomeCss";

export default function CreateAccountFirst() {
  const classes = homeStyles();

  return (
<div style={{backgroundColor:"rgb(240, 240, 240)"}}>
    
    <div className={classes.root} style={{display:"flex", justifyContent:"center"}} >
        
      <div className={classes.box} style={{width:400,height:150,backgroundColor:"white",marginTop:150,border:'0.09rem #dfe6e9 solid'}}  >

        <div style={{ fontWeight: "bolder", fontFamily: "Ubuntu", fontSize: "1.2rem",marginTop:5, marginBottom: "30px" }}>
          Email address confirmed
        </div>
        <div style={{ fontWeight: "lighter",fontStyle:'Ubuntu', fontSize: "0.9rem", marginBottom: "30px", color: "gray" }}>
           Your email address in now confirmed. Thank you
        </div>
        
       
        
       
        
        <Button
          variant="contained"
          style={{ borderRadius:7,fontFamily:"Ubuntu",
            width: "100%",
            backgroundColor: "Blue",
            color: "#ffffff",
            textTransform: "none",
          }}
        ><b>
Continue
          </b>
        </Button>
      </div>
    </div>
    </div>
  );
}