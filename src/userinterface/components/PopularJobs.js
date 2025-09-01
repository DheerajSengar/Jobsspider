import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function Popularjobs() {
   const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [showAll, setShowAll] = useState(false);
  const popularjobs1 = [
    "Delivery Person Jobs",
    "Accounts / Finance Jobs",
    "Sales (Field Work)",
    "Human Resource",
    "Backoffice Jobs",
,    
    
  ];
  const popularjobs2 = [
    "Business Development ",
    " Telecaller / BPO",
    " Work from Home Jobs",
    "Part Time Jobs",
    "Full Time Jobs",]
  const  popularjobs3= [
    "Night Shift Jobs",
    "Freshers Jobs",
    "Jobs for Women",
    "Jobs for 10th pass",
    "Jobs for 12th pass",


  ];

  
  
  const visibleJob1 = showAll ? popularjobs1 : popularjobs1.slice(0, 4);
  const visibleJob2 = showAll ? popularjobs2 : popularjobs2.slice(0, 4);
  const visibleJob3 = showAll ? popularjobs3 : popularjobs3.slice(0, 4);
  
  

  return (
    <div style={{padding:10,width:'90%',display:'flex',justifyContent:'center',alignItems:'center'}}>
       
       <div  style={{width:'80%'}}>
       
          <Grid container spacing={2} >
        
      <Grid size={12}>
         <div  style={{fontSize:16,fontWeight:"bolder"}}>
         Popular Jobs
          </div>
         </Grid>


          <Grid size={matches?4:6}>
            {visibleJob1.map((city, index) => (
              <Grid size={12}  key={index} >
              {city}
              </Grid>
            ))}
            
          </Grid>
          
       
        <Grid size={matches?4:6}   > 
            {visibleJob2.map((city, index) => (
              <Grid size={12}  key={index} >
                 {city}
              </Grid>
            ))}
          </Grid>


          {matches?<Grid size={4}   > 
            {visibleJob3.map((city, index) => (
              <Grid size={12}  key={index}>
                {city}
              </Grid>
            ))}
          </Grid>:<></>}

          <Grid size={12}>
      <div style={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button 
            variant="text"
            onClick={() => setShowAll(!showAll)}
            style={{ marginTop: "16px" }}
          >
            {showAll ? "View Less" : "View More"}
            {showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Button>
          </div>    
    
        </Grid>  
          
      
      </Grid>
     
    </div>      </div>
  );
}
