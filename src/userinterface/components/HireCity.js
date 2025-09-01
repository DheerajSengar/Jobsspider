import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function HireCity() {
   const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [showAll, setShowAll] = useState(false);
  const hirecity1 = [
   " Hire in Agra",
   " Hire in Ahmedabad",
   " Hire in Ahmednagar",
   "Hire in Aligarh",
   "Hire in Ajmer",
    "Hire in Amritsar",
    "Hire in Asansol",
    "Hire in Aurangabad",
    "Hire in Bareilly",
    "Hire in Belagavi",
    "Hire in Bengaluru",
    "Hire in Bhavnagar",
    "Hire in Bhilai",
    "Hire in Bhopal",
    "Hire in Bhubaneswar",
    "Hire in Bikaner",
    "Hire in Chandigarh",
    "Hire in Chennai",
    "Hire in Coimbatore",
    "Hire in Cuttack",
    "Hire in Dehradun",
    "Hire in Delhi-NCR",
    "Hire in Dhanbad",
    "Hire in Goa",
    "Hire in Gorakhpur",
    
  ];
  const hirecity2 = [
    "Hire in Guntur","Hire in Guwahati","Hire in Gwalior","Hire in Hubli","Hire in Hyderabad","Hire in Indore","Hire in Jabalpur","Hire in Jaipur","Hire in Jalandhar",
"Hire in Jamnagar","Hire in Jamshedpur","Hire in Jodhpur","Hire in Kannur","Hire in Kanpur","Hire in Kochi","Hire in Kolhapur",
"Hire in Kolkata","Hire in Kota","Hire in Lucknow","Hire in Ludhiana","Hire in Madurai","Hire in Malappuram","Hire in Mangalore","Hire in Meerut","Hire in Mumbai",]
  const  hirecity3= [
    "Hire in Mysuru",
    "Hire in Nagpur",
    "Hire in Nashik",
    "Hire in Panipat",
    "Hire in Patna",
    "Hire in Prayagraj",
    "Hire in Puducherry",
    "Hire in Pune",
    "Hire in Raipur",
    "Hire in Rajkot",
    "Hire in Ranchi",
    "Hire in Saharanpur",
    "Hire in Salem",
    "Hire in Solapur",
    "Hire in Surat",
    "Hire in Thiruvananthapuram",
    "Hire in Trichy",
    "Hire in Udaipur",
    "Hire in Ujjain",
    "Hire in Vadodara",
    "Hire in Varanasi",
    "Hire in Vijayawada",
    "Hire in Visakhapatnam",
    "Hire in Warangal",


  ];

  
  
  const visibleJob1 = showAll ? hirecity1 : hirecity1.slice(0, 4);
  const visibleJob2 = showAll ? hirecity2 : hirecity2.slice(0, 4);
  const visibleJob3 = showAll ? hirecity3 : hirecity3.slice(0, 4);
  
  

  return (
    <div  style={{padding:10,width:'90%',display:'flex',justifyContent:'center',alignItems:'center'}}>
       
       <div  style={{width:'80%'}}>
          
       
       
      <Grid  container spacing={2}   >
      <Grid size={12}>
         <div  style={{fontSize:16,fontWeight:"bolder"}}>
         Start Hiring
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
      
          </div>
    </div>
  );
}  
