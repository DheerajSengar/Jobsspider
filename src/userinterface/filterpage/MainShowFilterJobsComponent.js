import { Grid2 } from "@mui/material";
import FirstFilterComponent from "./FilterFirstComponent";
import FilterMiddleComponent from "./FilterMiddleComponent";
import FilterLastComponent from "./FilterLastComponent";

import SearchBarComponent from "../components/SearchBarComponent";
import SearchBarMob from "../components/SearchBarMob";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import UserReviewComponent from "../components/UserReviewComponent";
import { useLocation, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { postData,getData } from "../../services/FetchNodeServices";
export default function ShowFilterJobsComponent() {
  const theme = useTheme();
  const [jobs,setJobsList]=useState([])
  const params = useParams();
  const [refresh,setRefresh]=useState(false)  
  //const [exp,setExp]=useState(0)
  const location = useLocation();
  console.log(location.search);
  const keys = new URLSearchParams(location.search);
  console.log("Keys:",keys)

  var skill = keys.get("skills");
  var skill_id = keys.get("skillid");
  var categoryid = keys.get("categoryid");
  var subcategoryid = keys.get("subcategoryid");
  var expr = keys.get("exp");
  const [exp,setExp]=useState(expr)
  const [time,setTime]=useState("-1")

  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchJobs=async()=>{
    
      
    var res=await postData('userinterface/main_search_jobs',{ skills: skill, skillid: skill_id,categoryid,subcategoryid,expr:exp,time})
  
    setJobsList(res.data)
   }
  useEffect(function(){
    setJobsList([])
    fetchJobs()
  },[refresh])

  useEffect(function(){
    
    fetchJobs()
  },[])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: matches ? "100%" : "100%",
        height: "auto",
        flexDirection: "column",
      }}
    >
      <div>
        <Header />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "linear-gradient(199deg, rgba(255, 255, 255, 1) -84%, rgba(238, 239, 235, 0.12) -100%, rgb(239, 243, 232) 99%)",
        }}
      >
        <div style={{ marginLeft: matches ? 2 : 244, marginTop: 40 }}>
          {matches ? (
            <></>
          ) : (
            <SearchBarComponent
              param_skill={{ skills: skill, skillid: skill_id,categoryid,subcategoryid }}
              refresh={refresh}
              setRefresh={setRefresh}
              exp={exp}
              setExp={setExp}
              
            />
          )}
          {matches ? (
            <SearchBarMob
              param_skill={{ skills: skill, skillid: skill_id,categoryid,subcategoryid }}
              style={{ zIndex: 1 }}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ) : (
            <></>
          )}
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: matches ? 10 : 244,
            fontSize: 20,
            marginTop: 20,
            marginBottom: "2%",
            fontWeight: "bold",
          }}
        >
          Showing 210 jobs based on your filter
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: matches ? "column" : "row",
            justifyContent: "center",
          }}
        >
          {matches ? <></> : <FirstFilterComponent time={time}
              setTime={setTime}  exp={exp} setExp={setExp}/>}

          <FilterMiddleComponent jobData={jobs} />

          <FilterLastComponent />
        </div>
      </div>

      <div style={{ marginTop: "5%" }}>
        <UserReviewComponent />
      </div>
    </div>
  );
}
