import React from 'react';
import {
  TextField,
  Button,
  Box,
  Divider,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchBarMob2 from './SearchBarMob2';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export default function SearchBarMob() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate=useNavigate();

  const [open,setOpen]=useState(false)
  const handlefield=()=>{
    //  alert("rrrrr")
    setOpen(true);
    <SearchBarMob2 />
   navigate('/searchbarmob2')
   
  }
  return (
    <div style={{ padding: "15px", width: matches ? 'auto' : '100%' }}>
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
        {/* TextField for skill */}
        <TextField
          onClick={()=>handlefield(open)}
          fullWidth
          placeholder='Search a  "Jobs" '
          variant="standard"
          sx={{
            flex: 1,
            '& .MuiInputBase-input': {
              outline: 'none',
              fontSize: '14px',
            },
          }}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 15 }} />
              </InputAdornment>
            ),
          }}
        />
        <Divider orientation="vertical" flexItem />

        {/* Search Button */}
        <Button
          sx={{
            textTransform: "capitalize",
            fontSize: 14,
            padding: '5px 10px 5px 10px',
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
