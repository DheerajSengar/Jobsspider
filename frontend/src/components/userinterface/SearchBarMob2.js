import React, { useState } from 'react';
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
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../services/api/FetchNodeServices';

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

export default function SearchBarMob2() {
  const navigate = useNavigate();
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

  React.useEffect(() => {
    fetchAllSkill();
  }, []);

  const handleSearch = () => {
    const tskill = skill ? { ...skill } : {};
    tskill['exp'] = expr;
    if (location?.cityname) {
      tskill.location = location.cityname;
    }
    if (keyword && keyword.trim()) {
      tskill.keyword = keyword.trim();
    }
    const queryString = new URLSearchParams(tskill).toString();
    navigate(`/searchjobs?${queryString}`);
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
        width: 300,
        overflowY: "auto",
        zIndex: 1200,
      }}
    />
  );

  return (
    <div>
    <div>
        <Header />
    </div>
    <div style={{background:'#f4f2f6', padding :"15px", }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:"flex-start",
          flexDirection:'column',
          backgroundColor: "white",
          padding: "10px 10px",
          borderRadius: "8px",
          gap: "10px",
        }}
      >
        <div style={{width:'100%'}}>

        
        {/* Skill Autocomplete */}
        <Autocomplete
          fullWidth
          sx={{ flex: 1}}
          value={skill}
          options={topSkill}
          onChange={(event, newValue) => setSkill(newValue)}
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
              }}
            >
              <SearchIcon sx={{ color: "#8395a7" }} />
              {option.skills || option.categoryname}
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
                '& .MuiInputBase-input': {
                  outline: 'none', 
                  fontSize: '14px',
                },
              }}

              overflow='none'
              placeholder="Select a skill"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
              
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{fontSize:15}} />
                  </InputAdornment>
                ),

              }}
             
            />
          )}
        />

</div>
       <Divider orientation="vertical" flexItem />
       
       <div  style={{width:'100%'}}>
        {/* Experience Autocomplete */}
        <Autocomplete
          sx={{flexGrow:1 }}
          value={experience[expr]}
          options={experience}
          onChange={(event, newValue) => {
            if (newValue) {
              setExpr(newValue.expid);
            }
          }}
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
              '& .MuiInputBase-input': {
                outline: 'none', 
                fontSize: '14px',
              },
            }}
              {...params}
              overflow='none'
              placeholder="Select experience"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,

                startAdornment: (
                  <InputAdornment position="start">
                    <WorkOutlineIcon  sx={{fontSize:15}}/>
                  </InputAdornment>
                ),
              }}
              
            />
          )}
        />
       
       </div>

       <div style={{width:'100%'}}>
        {/* Location Autocomplete */}
   
        <Autocomplete
          sx={{ flexGrow:1}}
          value={location}
          options={worklocation}
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
                '& .MuiInputBase-input': {
                  outline: 'none', 
                  fontSize: '14px',
                },
              }}

               overflow='none'
              placeholder='Search for an area or city'
              variant="standard"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,

                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceOutlinedIcon sx={{fontSize:15}} />
                  </InputAdornment>
                ), 
              }}
              
            />
          )}
        />
        </div>

        <div style={{width:'100%'}}>
        {/* Keyword Search */}
        <TextField
          fullWidth
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search by keyword (e.g., React, Developer)'
          variant="standard"
          sx={{
            '& .MuiInputBase-input': {
              outline: 'none', 
              fontSize: '14px',
            },
          }}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{fontSize:15, color: "#8395a7"}} />
              </InputAdornment>
            ),
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        </div>


        <div style={{width:'100%'}}>

       
        {/* Search Button */}
        <Button
        fullWidth
        onClick={handleSearch}
          sx={{
            width:'100%',
            textTransform: "capitalize",
            fontSize: 14,
            padding:'5px 10px 5px 10px',
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
    </div>
    </div>
  );
}



