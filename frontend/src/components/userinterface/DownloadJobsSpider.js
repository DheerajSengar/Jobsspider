import { Divider, Paper } from "@mui/material";
import { serverURL } from "../../services/api/FetchNodeServices";
import { Fragment } from "react";
import StarIcon from "@mui/icons-material/Star";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DownloadJobsSpider() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper
      elevation={4}
      style={{
        width: matches ? "95%" : "80%",
        height: matches ? "700px" : "420px",
        borderRadius: 24,
        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)",
        border: `2px solid rgba(102, 126, 234, 0.2)`,
        display: "flex",
        flexDirection: matches ? "column" : "row",
        position: "relative",
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.15)',
        overflow: 'hidden'
      }}
    >
      <div style={{position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(102, 126, 234, 0.1)', filter: 'blur(50px)'}}></div>
      <div style={{position: 'absolute', bottom: -30, left: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(118, 75, 162, 0.1)', filter: 'blur(40px)'}}></div>
      <div
        style={{
          width: matches ? "80%" : "55%",
          height: matches ? "25%" : "100%",
          display: "flex",
          justifyContent: matches ? "start" : "center",
          alignItems: "center",
          margin: matches ? "30px" : 0,
          position: 'relative',
          zIndex: 1
        }}
      >
        <div
          style={{
            width: "90%",
            height: matches ? "100%" : "74%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              height: matches ? "100%" : "32%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: matches ? 32 : 48,
                color: "#667eea",
                fontWeight: 900,
                fontFamily: 'Ubuntu',
                lineHeight: 1.2
              }}
            >
              Download JobsSpider app!
            </div>
            {matches ? (
              <div style={{ fontSize: 16, fontWeight: 600, color: '#4a5568' }}>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{ marginBottom: 12, display: 'flex', alignItems: 'center'}}>
                    <span style={{color: '#667eea', marginRight: 8}}>✓</span> Unlimited job applications
                  </li>
                  <li style={{ marginBottom: 12, display: 'flex', alignItems: 'center'}}>HRs contact you directly</li>
                  <li style={{ marginBottom: 12, display: 'flex', alignItems: 'center'}}>Track your Applications</li>
                </ul>
              </div>
            ) : (
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  display: "flex",
                  flexDirection: matches ? "column" : "row",
                  color: '#4a5568',
                  alignItems: 'center'
                }}
              >
                <div style={{display: 'flex', alignItems: 'center'}}><span style={{color: '#667eea', marginRight: 6, fontSize: 20}}>✓</span> Unlimited job applications</div>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ marginLeft: 12, marginRight: 12, borderColor: 'rgba(102, 126, 234, 0.3)' }}
                />
                <div style={{display: 'flex', alignItems: 'center'}}><span style={{color: '#667eea', marginRight: 6, fontSize: 20}}>✓</span> HRs contact you directly</div>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ marginLeft: 12, marginRight: 12, borderColor: 'rgba(102, 126, 234, 0.3)' }}
                />
                <div style={{display: 'flex', alignItems: 'center'}}><span style={{color: '#667eea', marginRight: 6, fontSize: 20}}>✓</span> Track your Applications</div>
              </div>
            )}
          </div>
          {matches ? (
            <></>
          ) : (
            <div
              style={{
                display: "flex",
                background: "rgba(255, 255, 255, 0.9)",
                width: 300,
                padding: 16,
                borderRadius: 16,
                border: '1px solid rgba(102, 126, 234, 0.2)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.1)'
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  width: "60%",
                  alignSelf: "center",
                  padding: 10,
                  color: '#1a202c'
                }}
              >
                Scan QR to download JobsSpider app
              </div>
              <div style={{ padding: 10, width: "40%" }}>
                <img
                  src={`${serverURL}/images/fullstack.png`}
                  style={{ width: "100%", borderRadius: 12 }}
                  alt="QR Code"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          width: matches ? "27%" : "45%",
          height: matches ? "30%" : "100%",
          display: "flex",
          alignItems: matches ? "center" : "start",
          margin: matches ? 30 : 0,
        }}
      >
        {matches ? (
          <></>
        ) : (
          <div
            style={{
              width: "60%",
              height: "100%",
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "start",
            }}
          >
            <img src={`${serverURL}/images/apna-app.png`} alt="JobsSpider App Preview" />
          </div>
        )}

        <div
          style={{
            width: matches ? "100%" : "45%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
          }}
        >
          <div
            style={{
              width: matches ? "90%" : "80%",
              height: matches ? "95%" : "65%",
              marginBottom: matches ? 0 : 35,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(102, 126, 234, 0.15)",
                height: matches ? "43%" : "40%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                color: "#667eea",
                border: '1px solid rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{ width: "80%", height: "70%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StarIcon
                    style={{
                      color: "#ffd700",
                      width: matches ? 32 : 40,
                      height: matches ? 32 : 40,
                      marginRight: 10,
                    }}
                  />
                  <div
                    style={{
                      fontSize: matches ? 28 : 36,
                      fontWeight: 900,
                      color: '#1a202c'
                    }}
                  >
                    4.4
                  </div>
                </div>
                <div
                  style={{
                    fontSize: matches ? 16 : 18,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    color: '#4a5568',
                    marginTop: 4
                  }}
                >
                  5L reviews
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(118, 75, 162, 0.15)",
                height: matches ? "43%" : "40%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                color: "#764ba2",
                border: '1px solid rgba(118, 75, 162, 0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: matches ? "90%" : "80%",
                  height: matches ? "80%" : "70%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <DownloadForOfflineOutlinedIcon
                    style={{
                      width: matches ? 32 : 40,
                      height: matches ? 32 : 40,
                      marginRight: 10,
                      color: '#764ba2'
                    }}
                  />
                  <div
                    style={{
                      fontSize: matches ? 28 : 36,
                      fontWeight: 900,
                      color: '#1a202c'
                    }}
                  >
                    1 cr+
                  </div>
                </div>
                <div
                  style={{
                    fontSize: matches ? 16 : 18,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    color: '#4a5568',
                    marginTop: 4
                  }}
                >
                  App download
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {matches ? (
        <div
          style={{
            width: "90%",
            height: "16%",
            alignSelf: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            margin: 30,
          }}
        >
          <div
            style={{
              background: "white",
              width: "100%",
              height: "83%",
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "95%",
                height: "70%",
                borderRadius: 8,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginRight: 6,
                  marginLeft: 10,
                }}
              >
                Download it from Play Store
              </div>

              <img
                src={`${serverURL}/images/playstore.webp`}
                width={"30%"}
                alt="Play Store"
              />
            </div>
          </div>
          <div style={{ position: "absolute", top: 170, right: 0 }}>
            <img src={`${serverURL}/images/downloadmobile.png`} alt="Mobile Download Preview" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </Paper>
  );
}

