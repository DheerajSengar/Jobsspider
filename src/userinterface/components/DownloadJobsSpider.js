import { Button, Divider, Paper } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import { Fragment, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DownloadJobsSpider() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper
      style={{
        width: matches ? "95%" : "80%",
        height: matches ? "650px" : "400px",
        borderRadius: 18,
        background: "#f9f4ff",
        border: `1px solid #e5e7eb`,
        display: "flex",
        flexDirection: matches ? "column" : "row",
        position: "relative",
      }}
    >
      <div
        style={{
          width: matches ? "80%" : "55%",
          height: matches ? "25%" : "100%",
          display: "flex",
          justifyContent: matches ? "start" : "center",
          alignItems: "center",
          margin: matches ? "30px" : 0,
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
                fontSize: matches ? 30 : 42,
                color: "rgb(81 33 148)",
                fontWeight: "bold",
              }}
            >
              Download JobsSpider app!
            </div>
            {matches ? (
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                <ul>
                  <li style={{ marginBottom: 15 }}>
                    Unlimited job applications
                  </li>
                  <li style={{ marginBottom: 15 }}>HRs contact you directly</li>
                  <li style={{ marginBottom: 15 }}>Track your Applications</li>
                </ul>
              </div>
            ) : (
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  display: "flex",
                  flexDirection: matches ? "column" : "row",
                }}
              >
                <div> Unlimited job applications</div>
                <Divider
                  orientation="vertical"
                  flexItem
                  color="black"
                  style={{ marginLeft: 6, marginRight: 6 }}
                />
                <div>HRs contact you directly</div>
                <Divider
                  orientation="vertical"
                  flexItem
                  color="black"
                  style={{ marginLeft: 6, marginRight: 6 }}
                />
                <div>Track your Applications</div>
              </div>
            )}
          </div>
          {matches ? (
            <></>
          ) : (
            <div
              style={{
                display: "flex",
                background: "rgb(255 255 255)",
                width: 280,
                padding: 10,
                borderRadius: 15,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  width: "60%",
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                Scan QR to download Apna app
              </div>
              <div style={{ padding: 10, width: "50%" }}>
                <img
                  src={`${serverURL}/images/fullstack.png`}
                  style={{ width: "100%", borderRadius: 10 }}
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
            <img src={`${serverURL}/images/apna-app.png`} />
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
                backgroundColor: "#f3ebff",
                height: matches ? "43%" : "40%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                color: "#6d0090",
              }}
            >
              <div style={{ width: "80%", height: "70%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StarIcon
                    style={{
                      color: "#ffd166",
                      width: 35,
                      height: matches ? 35 : 40,
                      marginRight: 8,
                    }}
                  />
                  <div
                    style={{
                      fontSize: matches ? 25 : 30,
                      fontWeight: "bold",
                    }}
                  >
                    4.4
                  </div>
                </div>
                <div
                  style={{
                    fontSize: matches ? 16 : 18,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    opacity: 0.9,
                  }}
                >
                  5L reviews
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f3ebff",
                height: matches ? "43%" : "40%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                color: "#6d0090",
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
                      width: 35,
                      height: matches ? 35 : 40,
                      marginRight: 8,
                    }}
                  />
                  <div
                    style={{
                      fontSize: matches ? 25 : 30,
                      fontWeight: "bold",
                    }}
                  >
                    1 cr+
                  </div>
                </div>
                <div
                  style={{
                    fontSize: matches ? 16 : 18,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    opacity: 0.9,
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
              />
            </div>
          </div>
          <div style={{ position: "absolute", top: 170, right: 0 }}>
            <img src={`${serverURL}/images/downloadmobile.png`} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </Paper>
  );
}
