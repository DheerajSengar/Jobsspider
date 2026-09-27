import React, { useState } from 'react';
import {
  TextField,
  Button,
  Divider,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";


export default function SearchBarMob({ param_skill, refresh, setRefresh }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate=useNavigate();
  const [keyword, setKeyword] = useState('');

  const handlefield=()=>{
    const tskill = param_skill ? { ...param_skill } : {};
    if (keyword && keyword.trim()) {
      tskill.keyword = keyword.trim();
    }
    const queryString = new URLSearchParams(tskill).toString();
    navigate(`/searchjobs?${queryString}`);
    
    if (setRefresh) {
      setRefresh(!refresh);
    }
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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handlefield();
            }
          }}
        />
        <Divider orientation="vertical" flexItem />

        {/* Search Button */}
        <Button
          onClick={handlefield}
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

