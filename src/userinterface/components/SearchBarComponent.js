import React from "react";
import {
  TextField,
  Button,
  Autocomplete,
  Box,
  Popper,
  InputAdornment,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useState,useEffect } from "react";

import { getData } from "../../services/FetchNodeServices";
export default function SearchBarComponent({ param_skill,refresh,setRefresh,exp,setExp }) {
  console.log("HOME SKILL:", param_skill);
  const theme = useTheme();
 
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [skill, setSkill] = useState({ skillid: 0,categoryid:0,subcategoryid:0,skills: "" });
  const [topSkill,setTopSkill]=useState([])
  const [expr,setExpr]=useState(0)
  
  const fetchAllSkill=async()=>{
    var res=await getData('userinterface/fetch_all_skills')
    setTopSkill(res.data)

  }
 useEffect(function(){
fetchAllSkill()

 },[])
 const handleExperience=(e)=>{
  alert(JSON.stringify(e.target.value))
 }
  const handleSearch = () => {
    //navigate("/searchjobs",{state:{skill:skill}})
    var tskill=skill
    if(exp==undefined)
    tskill['exp']=expr
    else
    tskill['exp']=exp
    const queryString = new URLSearchParams(skill).toString();
    navigate(`/searchjobs?${queryString}`);
   try{setRefresh(!refresh)}catch(e){}

  };
/*  const topSkill = [
    { Skillid: 1, Skill: "MERN" },
    { Skillid: 2, Skill: "Node.js" },
    { Skillid: 3, Skill: "React.js" },
    { Skillid: 4, Skill: "Angular" },
    { Skillid: 5, Skill: "Vue.js" },
    { Skillid: 6, Skill: "Python" },
    { Skillid: 7, Skill: "Django" },
    { Skillid: 8, Skill: "Ruby on Rails" },
    { Skillid: 9, Skill: "Java" },
  ];
*/
  const experience = [
    { expid: 0, exp: "Fresher" },
    { expid: 1, exp: "1 year" },
    { expid: 2, exp: "2 years" },
    { expid: 3, exp: "3 years" },
    { expid: 4, exp: "4 years" },
    { expid: 5, exp: "5 years" },
    { expid: 6, exp: "6 years" },
    { expid: 7, exp: "7 years" },
    { expid: 8, exp: "8 years" },
    { expid: 9, exp: "9+ years" },
  ];

  const worklocation = [
    { cityid: 1, cityname: "Mumbai" },
    { cityid: 2, cityname: "Delhi" },
    { cityid: 3, cityname: "Bangalore" },
    { cityid: 4, cityname: "Hyderabad" },
    { cityid: 5, cityname: "Chennai" },
    { cityid: 6, cityname: "Pune" },
    { cityid: 7, cityname: "Kolkata" },
    { cityid: 8, cityname: "Ahmedabad" },
    { cityid: 9, cityname: "Jaipur" },
  ];

  const CustomPopper = (props) => (
    <Popper
      {...props}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ]}
      style={{
        ...props.style,
        width: 300,
        overflowY: "auto",
        zIndex: 1200,
      }}
    />
  );

  return (
    <div style={{ padding: "15px", width: matches ? "auto" : "780px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "white",
          padding: "10px 10px",
          borderRadius: "8px",
          gap: "10px",
        }}
      >
        {/* Skill Autocomplete */}

        <Autocomplete
          fullWidth
          value={param_skill == undefined ? skill : param_skill}
          sx={{ flex: 1 }}
          options={topSkill}
          onChange={(event, newValue) => {
            setSkill(newValue)
           
          }}
          PopperComponent={CustomPopper}
          autoHighlight
          getOptionLabel={(option) => option.skills}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <SearchIcon sx={{ color: "#8395a7" }} />
              {option.skills}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                "& .MuiInputBase-input": {
                  outline: "none",
                  fontSize: "14px",
                },
              }}
              overflow="none"
              placeholder="Select a skill"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,

                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 15 }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Divider orientation="vertical" flexItem />

        {/* Experience Autocomplete */}
        <Autocomplete
          sx={{ flexGrow: 1 }}
          options={experience}
          onChange={(event, newValue) => {
           try{
            setExp(newValue.expid);
           }
           catch(e){
            setExpr(newValue.expid)
           }
            
          }}
          value={experience[exp]}
          PopperComponent={CustomPopper}
          autoHighlight
          getOptionLabel={(option) => option.exp}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <WorkOutlineOutlinedIcon sx={{ color: "#8395a7" }} />
              {option.exp}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              sx={{
                // '& .MuiOutlinedInput-root': {
                //   '& fieldset': {
                //     border: 'none',
                //   },
                //   '&:hover fieldset': {
                //     border: 'none',
                //   },
                //   '&.Mui-focused fieldset': {
                //     border: 'none',
                //   },
                // },
                "& .MuiInputBase-input": {
                  outline: "none",
                  fontSize: "14px",
                },
              }}
              {...params}
              overflow="none"
              placeholder="Select experience"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,

                startAdornment: (
                  <InputAdornment position="start">
                    <WorkOutlineIcon sx={{ fontSize: 15 }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Divider orientation="vertical" flexItem />
        {/* Location Autocomplete */}
        <Autocomplete
          sx={{ flexGrow: 1 }}
          options={worklocation}
          PopperComponent={CustomPopper}
          autoHighlight
          getOptionLabel={(option) => option.cityname}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <RoomOutlinedIcon sx={{ color: "#8395a7" }} />
              {option.cityname}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                // '& .MuiOutlinedInput-root': {
                //   '& fieldset': {
                //     border: 'none',
                //   },
                //   '&:hover fieldset': {
                //     border: 'none',
                //   },
                //   '&.Mui-focused fieldset': {
                //     border: 'none',
                //   },
                // },
                "& .MuiInputBase-input": {
                  outline: "none",
                  fontSize: "14px",
                },
              }}
              overflow="none"
              placeholder="Search for an area or city"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,

                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceOutlinedIcon sx={{ fontSize: 15 }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          sx={{
            textTransform: "capitalize",
            fontSize: 14,
            padding: "5px 10px 5px 10px",
            fontWeight: "bold",
            backgroundColor: "#b42f6b",
            color: "#fff",
            height: "40px",
            borderRadius: "5px",
            "&:hover": { backgroundColor: "#e6496e" },
          }}
        >
          Search jobs
        </Button>
      </div>
    </div>
  );
}
