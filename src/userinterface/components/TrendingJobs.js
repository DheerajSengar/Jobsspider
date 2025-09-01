import { Button, Paper } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import { useState } from "react";
import { homeStyles } from "../HomeCss";
export default function TrendingJobs({ item,colors }) {
 console.log("Colorrrrrrs:",colors)
  const classes = homeStyles();
  const [bk, setBk] = useState("#f1f2f6");
  const [move, setMove] = useState("text");
  const [color,setColor]=useState('')
  const [btnProps, setBtnProps] = useState({
    v: "text",
    bk: "#f1f2f6",
    c: "#b03a84",
    brc: "#f1f2f6",
  });
  const handleColorChangeOver = () => {

    setBk("#ffff");
    setColor(colors)
    setMove("textMove");
    setBtnProps({
      v: "contained",
      bk: color,
      c: "#ffff",
      brc:color,
    });
  };

  const handleColorChangeLeave = () => {
    setBk("#f1f2f6");

    setMove("text");
    setBtnProps({ v: "text", bk: "#f1f2f6", c: "#b03a84", brc: "#f1f2f6" });
  };

 
  

    return(
      <Paper
        onMouseLeave={handleColorChangeLeave}
        onMouseOver={()=>handleColorChangeOver()}
        elevation={0}
        style={{
          padding: "30px 20px 30px 20px",
          width: 360,
          height: 280,
          borderRadius: 18,
          background: `linear-gradient(0deg, ${btnProps.bk} -80%, rgba(255,255,255,0) 83%)`,
          border: `0.5px solid ${btnProps.brc}`,
          margin:15,

        }}
      >
        <div className="b" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 18, color: "#7f8c8d" }}>
            {`Trending @ #${item.trending}`.toUpperCase()}
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            {item.jobtype}
          </div>

          <div style={{color:'transparent',WebkitTextStroke:'0.3px grey'}} className={`${move}`}>{item.jobtype}</div>
        </div>
        <div style={{ marginTop: 60 }}>
          <Button
            variant={btnProps.v}
            style={{
              color: btnProps.c,
              textTransform: "capitalize",
              fontSize: 18,
              fontWeight: "bold",
              background: btnProps.bk,
            }}
          >{`View All >`}</Button>
        </div>
        <div style={{ position: "relative" }}>
          <img
            src={`${serverURL}/images/${item.picture}`}
            style={{
              width: 200,
              height:215,
              borderBottomRightRadius: 25,
              position: "absolute",
              zIndex: 2,
              top: -190,
              right: -20,
            }}
          />
        </div>
      </Paper>
    
  );
 


}