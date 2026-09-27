import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { getData } from "../../services/api/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const defaultSkills = [
  { skillid: 1, categoryid: 1, subcategoryid: 1, skills: "Information Technology (IT) - Full Stack Developer" },
  { skillid: 2, categoryid: 1, subcategoryid: 1, skills: "Frontend Developer (React.js / Next.js)" },
  { skillid: 3, categoryid: 1, subcategoryid: 1, skills: "Backend Developer (Node.js / Java / Python)" },
  { skillid: 4, categoryid: 1, subcategoryid: 2, skills: "Data Science & Data Analyst" },
  { skillid: 5, categoryid: 2, subcategoryid: 3, skills: "Sales & Marketing - Digital Marketing" },
  { skillid: 6, categoryid: 2, subcategoryid: 4, skills: "Business Development & Sales Executive" },
  { skillid: 7, categoryid: 3, subcategoryid: 5, skills: "Finance & Accounting - GST / Tally" },
  { skillid: 8, categoryid: 4, subcategoryid: 6, skills: "Human Resources (HR) & Talent Acquisition" },
  { skillid: 9, categoryid: 5, subcategoryid: 7, skills: "Design & Creative - UI/UX Designer" },
  { skillid: 10, categoryid: 1, subcategoryid: 1, skills: "MERN Stack Developer" }
];

export default function SearchBarComponent({ param_skill, refresh, setRefresh, exp, setExp }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [skill, setSkill] = useState(null);
  const [topSkill, setTopSkill] = useState(defaultSkills);
  const [expr, setExpr] = useState(0);
  const [location, setLocation] = useState(null);
  const [keyword, setKeyword] = useState('');

  const fetchAllSkill = async () => {
    try {
      const res = await getData('userinterface/fetch_all_skills');
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setTopSkill(res.data);
      } else {
        setTopSkill(defaultSkills);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      setTopSkill(defaultSkills);
    }
  };

  useEffect(() => {
    fetchAllSkill();
  }, []);

  useEffect(() => {
    if (param_skill?.skillid || param_skill?.skills) {
      setSkill(param_skill);
    }
  }, [param_skill?.skillid, param_skill?.skills, param_skill?.categoryid, param_skill?.subcategoryid]);

  const handleSearch = () => {
    const tskill = skill ? { ...skill } : {};
    tskill['exp'] = exp !== undefined ? exp : expr;
    if (location?.cityname) {
      tskill.location = location.cityname;
    }
    if (keyword && keyword.trim()) {
      tskill.keyword = keyword.trim();
    }
    const queryString = new URLSearchParams(tskill).toString();
    navigate(`/searchjobs?${queryString}`);
    
    if (setRefresh) {
      setRefresh(!refresh);
    }
  };
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
        width: 320,
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
          padding: "12px 14px",
          borderRadius: "14px",
          gap: "10px",
          border: "1px solid #e5eaf1",
          boxShadow: "0 12px 28px rgba(32, 48, 74, 0.10)",
        }}
      >
        {/* Skill / Stream Autocomplete */}

        <Autocomplete
          fullWidth
          value={skill}
          sx={{ flex: 1.2 }}
          options={topSkill}
          isOptionEqualToValue={(option, value) => {
            if (!option || !value) return false;
            return option.skillid === value.skillid || option.skills === value.skills;
          }}
          onChange={(event, newValue) => {
            setSkill(newValue);
          }}
          PopperComponent={CustomPopper}
          autoHighlight
          getOptionLabel={(option) => {
            if (!option) return "";
            if (typeof option === 'string') return option;
            return option.skills || option.categoryname || "";
          }}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: 13,
                padding: "8px 12px"
              }}
            >
              <SearchIcon sx={{ color: "#8395a7", fontSize: 18 }} />
              {option.skills || option.categoryname}
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
              placeholder="Select stream / skill"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,

                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 16 }} />
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
            if (newValue) {
              if (setExp) {
                setExp(newValue.expid);
              } else {
                setExpr(newValue.expid);
              }
            }
          }}
          value={experience.find(e => e.expid === (exp !== undefined ? exp : expr)) || experience[0]}
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
          value={location}
          onChange={(event, newValue) => setLocation(newValue)}
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
        <Divider orientation="vertical" flexItem />
        {/* Keyword Search */}
        <TextField
          sx={{ flexGrow: 1 }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by keyword (e.g., React, Developer)"
          variant="standard"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 15, color: "#8395a7" }} />
              </InputAdornment>
            ),
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          sx={{
            textTransform: "capitalize",
            fontSize: 14,
            padding: "5px 10px 5px 10px",
            fontWeight: "bold",
            backgroundColor: "#bb2e70",
            color: "#fff",
            height: "40px",
            borderRadius: "9px",
            "&:hover": { backgroundColor: "#9e215c" },
          }}
        >
          Search jobs
        </Button>
      </div>
    </div>
  );
}

