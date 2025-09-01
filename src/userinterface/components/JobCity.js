import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
 
 
export default function JobCity() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [showAll, setShowAll] = useState(false);
  const jobcity1 = [
   " Jobs in Agra",
   " Jobs in Ahmedabad",
   " Jobs in Ahmednagar",
   "Jobs in Aligarh",
   "Jobs in Ajmer",
    "Jobs in Amritsar",
    "Jobs in Asansol",
    "Jobs in Aurangabad",
    "Jobs in Bareilly",
    "Jobs in Belagavi",
    "Jobs in Bengaluru",
    "Jobs in Bhavnagar",
    "Jobs in Bhilai",
    "Jobs in Bhopal",
    "Jobs in Bhubaneswar",
    "Jobs in Bikaner",
    "Jobs in Chandigarh",
    "Jobs in Chennai",
    "Jobs in Coimbatore",
    "Jobs in Cuttack",
    "Jobs in Dehradun",
    "Jobs in Delhi-NCR",
    "Jobs in Dhanbad",
    "Jobs in Goa",
    "Jobs in Gorakhpur",
    
  ];
  const jobcity2 = [
    "Jobs in Guntur","Jobs in Guwahati","Jobs in Gwalior","Jobs in Hubli","Jobs in Hyderabad","Jobs in Indore","Jobs in Jabalpur","Jobs in Jaipur","Jobs in Jalandhar",
"Jobs in Jamnagar","Jobs in Jamshedpur","Jobs in Jodhpur","Jobs in Kannur","Jobs in Kanpur","Jobs in Kochi","Jobs in Kolhapur",
"Jobs in Kolkata","Jobs in Kota","Jobs in Lucknow","Jobs in Ludhiana","Jobs in Madurai","Jobs in Malappuram","Jobs in Mangalore","Jobs in Meerut","Jobs in Mumbai",


  ];

  const  jobcity3= [
    "Jobs in Mysuru",
    "Jobs in Nagpur",
    "Jobs in Nashik",
    "Jobs in Panipat",
    "Jobs in Patna",
    "Jobs in Prayagraj",
    "Jobs in Puducherry",
    "Jobs in Pune",
    "Jobs in Raipur",
    "Jobs in Rajkot",
    "Jobs in Ranchi",
    "Jobs in Saharanpur",
    "Jobs in Salem",
    "Jobs in Solapur",
    "Jobs in Surat",
    "Jobs in Thiruvananthapuram",
    "Jobs in Trichy",
    "Jobs in Udaipur",
    "Jobs in Ujjain",
    "Jobs in Vadodara",
    "Jobs in Varanasi",
    "Jobs in Vijayawada",
    "Jobs in Visakhapatnam",
    "Jobs in Warangal",


  ];

  
  
  const visibleJob1 = showAll ? jobcity1 : jobcity1.slice(0, 4);
  const visibleJob2 = showAll ? jobcity2 : jobcity2.slice(0, 4);
  const visibleJob3 = showAll ? jobcity3 : jobcity3.slice(0, 4);
  
  

  return (
    <div style={{padding:10,width:'90%',display:'flex',justifyContent:'center',alignItems:'center'}}>
       
    <div  style={{width:'80%'}}>
       
      <Grid container spacing={2} >
        
         <Grid size={12}>
         <div  style={{fontSize:16,fontWeight:"bolder"}}>
          Find Jobs 
          </div>
         </Grid>
          <Grid size={matches?4:6}  >
            {visibleJob1.map((city, index) => (
              <Grid size={12}  key={index} >
                 {city} 
              </Grid>
            ))}
            
          </Grid>
          
     
        <Grid size={matches?4:6}  > 
            {visibleJob2.map((city, index) => (
              <Grid size={12}  key={index} >
              {city} 
              </Grid>
            ))}
          </Grid>


         {matches?<Grid size={4}   > 
            {visibleJob3.map((city, index) => (
              <Grid size={12}  key={index} >
             {city} 
              </Grid>
            ))}
          </Grid>:<></>}

      <Grid size={12}>
      <div style={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button 
            variant="text"
            onClick={() => setShowAll(!showAll)}
            style={{ marginTop: 5 }}
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
