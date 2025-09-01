import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function JobsByDepartment() {
   const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [showAll, setShowAll] = useState(false);
  const jobsByDepartment1 = [
    "Admin / Back Office / Computer Operator Jobs",
    "Advertising / Communication Jobs",
    "Aviation & Aerospace Jobs",
    "Banking / Insurance / Financial Services Jobs",
    "Beauty, Fitness & Personal Care Jobs",
    "Construction & Site Engineering Jobs",
    "Consulting Jobs",
    "Content, Editorial & Journalism Jobs",
    "CSR & Social Service Jobs",
    "Customer Support Jobs",
    "Data Science & Analytics Jobs",
    "Delivery / Driver / Logistics Jobs",
    "Domestic Worker Jobs",
    "Energy & Mining Jobs",
    "Engineering - Hardware & Networks Jobs",
     
  ];
  const jobsByDepartment2 = [
"Environment Health & Safety Jobs",
"Facility Management Jobs",
"Finance & Accounting Jobs",
"Healthcare / Doctor / Hospital Staff Jobs",
"Human Resources Jobs",
"IT & Information Security Jobs",
"Legal & Regulatory Jobs",
"Maintenance Services Jobs",
"Marketing / Brand / Digital Marketing Jobs",
"Media Production & Entertainment Jobs",
"Operations Jobs",
"Production / Manufacturing / Engineering Jobs",
"Product Management Jobs",
"Project & Program Management Jobs",
"Purchase & Supply Chain Jobs",

    ]
  const  jobsByDepartment3= [
   " Quality Assurance Jobs",
   " Research & Development Jobs",
   " Restaurant / Hospitality / Tourism Jobs",
   " Retail & eCommerce Jobs",
   " Risk Management & Compliance Jobs",
   " Sales & BD Jobs",
   " Security Services Jobs",
   " Shipping & Maritime Jobs",
   " Software Engineering Jobs",
   " Strategic & Top Management Jobs",
   " Tailoring, Apparel & Home Furnishing Jobs",
   " Teaching & Training Jobs",
   " UX, Design & Architecture Jobs",



  ];


  
  const visibleJob1 = showAll ?jobsByDepartment1 :jobsByDepartment1.slice(0, 4);
  const visibleJob2 = showAll ?jobsByDepartment2 :jobsByDepartment2.slice(0, 4);
  const visibleJob3 = showAll ?jobsByDepartment3 :jobsByDepartment3.slice(0, 4);
  
  

  return (
    <div style={{padding:10,width:'90%',display:'flex',justifyContent:'center',alignItems:'center'}}>
       
    <div  style={{width:'80%'}}>
       
           
       
          <Grid container spacing={2} >
        
        <Grid size={12}>
        <div  style={{fontSize:16,fontWeight:"bolder"}}>
        Jobs by Department 
         </div>
        </Grid>
          <Grid size={matches?4:6}>
            {visibleJob1.map((city, index) => (
              <Grid size={12}  key={index} >
              {city}
              </Grid>
            ))}
            
          </Grid>
          
    
        <Grid  size={matches?4:6}   > 
            {visibleJob2.map((city, index) => (
              <Grid size={12}  key={index} >
                 {city}
              </Grid>
            ))}
          </Grid>


          {matches?<Grid size={4}    > 
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
