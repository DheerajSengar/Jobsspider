import spider from "../../assets/spider.png";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Divider from "@mui/material/Divider";
import { serverURL } from "../../services/FetchNodeServices";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Footer() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div
      style={{
        background: "#190A28",
        width: "100%",
        height:matches?250:300,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: matches?"100%":"50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width:matches?"95%": "70%",height:matches?"90%":"60%",display:'flex',flexDirection:'column'}}>
          <div
            style={{
              height: matches?"45%":"55%",
              width: matches?"64%":"67%",
              display: "flex",
              justifyContent: "space-between",
              alignSelf:matches?"center":"start",
            }}
          >
            <div>
              <img src={spider} style={{ width:matches?75: 90 }} />
            </div>
            {matches?
            <div><Divider variant="middle" color="gray" style={{ width:"3%",height:'80%',alignSelf:'center'}}/></div> :<></>}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                
               
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: matches?18:20,
                  color: "#ffff",
                }}
              >
                Follow us on social media
              </div>


              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                  height: "40%",
                  width: "100%",
                }}
              >
                <FacebookSharpIcon
                  fontSize="large"
                  style={{ color: "#ffff" }}
                />
                <TwitterIcon fontSize="large" style={{ color: "#ffff" }} />
                <InstagramIcon fontSize="large" style={{ color: "#ffff" }} />
                <YouTubeIcon fontSize="large" style={{ color: "#ffff" }} />
                <LinkedInIcon fontSize="large" style={{ color: "#ffff" }} />
              </div>
            </div>
          </div>

          <Divider
            color="gray"
            variant="middle" flexItem 
            style={{ marginLeft:matches?0:28, margin:matches?5:5,marginTop:matches?15:10, height: 1.5 }}
          />

          <div
            style={{
              height: matches?'50%':"32%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: matches?"100%":"70%",
                display: "flex",
                flexDirection:matches?'column':'row',
                color: "#ffff",
                fontSize: 13,
                justifyContent: "space-evenly",
                alignItems:matches?'center':<></>,
              }}
            >
              <div>© 2025 JobsSpider | All rights reserved</div>
              <div>Privacy Policy</div>
              <div>Terms & Conditions</div>
            </div>
          </div>
        </div>
      </div>

      {matches?<></>:
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "60%",
            height: "60%",
            background: "white",
            borderRadius: 20,
            display: "flex",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                height: "auto",
              }}
            >
              <div style={{ fontSize: 21, fontWeight: "bold" }}>
                Apply on the go
              </div>
              <div style={{}}>Get real time job updates on our App</div>
              <div>
                <img
                  src={`${serverURL}/images/en_badge_web_generic.png`}
                  width={"60%"}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={`${serverURL}/images/fullstack.png`}
              style={{ width: "80%", height: "60%" }}
            />
          </div>
        </div>
      </div>
}
    </div>
  );
}
