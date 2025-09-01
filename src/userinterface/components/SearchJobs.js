import { TextField, Button, Divider } from "@mui/material";
import { useState } from "react";
import GetJobComponent from "./GetJobsComponent";
import { serverURL } from "../../services/FetchNodeServices";
import SearchBarComponent from "./SearchBarComponent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import SearchBarMob from "./SearchBarMob";

export default function SearchJobs() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [isClicked, setIsClicked] = useState(false);
  var Data = [
    {
      candidatename: "Shivani Singh ",
      title: "got Job",
      picture: "maingirl3.png",
    },
    {
      candidatename: "Siddhart Shivhare ",
      title: "got Job",
      picture: "maingirl3.png",
    },
    {
      candidatename: "Pankaj Sharma",
      title: "has fixed an interview ",
      picture: "maingirl3.png",
    },
    {
      candidatename: "Rohit Singh ",
      title: "has fixed an interview",
      picture: "maingirl3.png",
    },
    {
      candidatename: "Amnendra singh  ",
      title: "got Job",
      picture: "maingirl3.png",
    },
    {
      candidatename: "Shivam Rajput",
      title: "got Job",
      picture: "maingirl3.png",
    },
    {
      candidatename: "Priyanshu",
      title: "has fixed an interview",
      picture: "maingirl3.png",
    },
    {
      candidatename: "Neeraj Verma",
      title: "has fixed an interview",
      picture: "maingirl3.png",
    },
    { candidatename: "Nikhil", title: "got Job", picture: "maingirl3.png" },
  ];

  return (
    <div
      style={{
        height: matches ? 650 : "auto",
        paddingTop: 20,
        background:
          "linear-gradient(270deg, rgba(253, 254, 250, 0.09) 15%, rgba(199, 253, 134, 0.69) 100%)",
      }}
    >
      <div
        style={{
          fontSize: matches ? 18 : 20,
          fontWeight: "bolder",
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: matches ? 20 : 80,
          marginTop: matches ? 40 : 60,
          height: "auto",
          color: "#b42f6b",
        }}
      >
        INDIA’S #1 JOB PLATFORM
      </div>
      <div
        style={{
          fontSize: matches ? 34 : 60,
          fontWeight: "bolder",
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: matches ? 20 : 80,
          marginTop: matches ? 15 : 20,
          height: "auto",
        }}
      >
        Your job search ends here
      </div>
      <div
        style={{
          fontSize: matches ? 14 : 25,
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: matches ? 20 : 80,
          marginTop: matches ? 16 : 20,
          height: "auto",
        }}
      >
        Discover 50 lakh+ career opportunities
      </div>

      <div
        style={{
          marginLeft: matches ? 5 : 80,
          marginTop: matches ? 30 : 60,
        }}
      >
        {matches ? <></> : <SearchBarComponent />}

        {matches ? (
          <div>
            <SearchBarMob />
          </div>
        ) : (
          <></>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            justifyItems: "flex-end",
            backgroundColor: "transparent",
            position: "relative",
          }}
        >
          <img
            src={`${serverURL}/images/main_girl.png`}
            style={{
              position: "absolute",
              width: matches ? "85%" : "36%",
              top: matches ? -80 : -330,
              zIndex: matches ? -1 : 0,
              left: matches ? 0 : "",
            }}
          />
        </div>
      </div>

      {matches ? (
        <></>
      ) : (
        <div style={{ marginTop: 245 }}>
          {/* <GetJobComponent data={Data} />*/}
        </div>
      )}

      {matches ? <></> : <Divider style={{ marginTop: 50 }} />}
    </div>
  );
}
