import { Paper } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
export default function ReviewComponet({ item }) {
  return (
    <div style={{height:"400px",display:'flex',alignItems:'center',justifyContent:'center'}}  >

      <Paper
        key={item.userreviewid}
        style={{
          width: "400px",
          height: "250px",
          backgroundColor: "#fff",
          borderRadius: "18px",
          margin: "10px 0",
          padding: "20px",
          
        }}
        elevation={3}
      >
        <div  >
          <img src={`${serverURL}/images/${item.userpicture}`} style={{ width: 80, height: 90, position: "absolute", zIndex: 2, top:25, borderRadius: "18px" }} />
          <div style={{display:'flex' }}>
          <strong style={{ marginLeft: "98px" }}>{item.username}</strong>
           {/* PLACED icon */}
          <div style={{border:'0.5px solid #B6BBC4',marginLeft:'10px',borderRadius:'90px',width:'70px', height:'20px',display:'flex'}}> 
          <div style={{backgroundColor:"#218c74",borderRadius:'90%',margin:'1.2px 0px 0px 1px',width:'17px', height:'17px'}}>
            <CheckCircleOutlineIcon style={{width:'11px',margin:'-3px 3px',color:'#fff'}}/>
          </div>
          <div style={{color:'#218c74',fontWeight:'bold',fontSize:11,marginLeft:'7px',marginTop:'2px'}}>
            PLACED
          </div>
          </div>
          {/* PLACED icon */}
          </div>
          <strong style={{ display: "flex", marginLeft: "98px" }}>{item.userrating}
            <Stack spacing={1} style={{marginLeft:"10px"}}>
             
              <Rating name="half-rating-read" defaultValue={item.userrating} precision={0.5} readOnly />
            </Stack>
          </strong>
          <p style={{fontSize:20, fontWeight:200, fontFamily:"Ubuntu"}}>{item.userreview}</p>

        </div>
      </Paper>

    </div>
  );
}
