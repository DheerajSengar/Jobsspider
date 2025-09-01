import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Avatar from '@mui/material/Avatar';
import  Grid  from '@mui/material/Grid2';
import category from "../../assets/category.png"
import subcategory from "../../assets/subcategory.png"
import Company from "../companies/Company"
import skill from "../../assets/skill.png"
import verification from "../../assets/verification.png"
import shutdown from "../../assets/shutdown.png"
import reports from "../../assets/reports.png"
import companies from "../../assets/company.png" 
import dashboard from "../../assets/dashboard.png" 
import Category from "../category/Category";
import SubCategory from "../subcategory/SubCategory"
import DisplayAllSubCategory from "../subcategory/DisplayAllSubCategory"
import RequiredSkills from "../requiredskill/RequiredSkills"
import displayallrequiredskills from "../requiredskill/DisplayAllRequiredSkills"

import company from "../companies/Company"
import DisplayAllCompany from "../companies/DisplayAllCompany"

import DisplayAllCategory from "../category/DisplayAllCategory";
import { Routes,Route,useNavigate } from 'react-router';
import { serverURL } from '../../services/FetchNodeServices';
import DisplayAllRequiredSkills from '../requiredskill/DisplayAllRequiredSkills';
import DisplayAllCompanyJobs from '../companyjobs/DisplayAllCompanyJobs'; 

export default function DashboardAdmin() {
 const navigate=useNavigate()
 var adminData=JSON.parse(localStorage.getItem("ADMIN"))
  const menuList=()=>{
    return( <Box sx={{margin:"40px 2px 0px 20px",padding:1, width: '100%', maxWidth: 360,border:'0.5px #dfe6e9 solid',borderRadius:10}}>
        <nav aria-label="main mailbox folders">
          <List>
          <ListItem disablePadding>
            <ListItemIcon>
                  <img src={dashboard} style={{width:28}}/>
                </ListItemIcon>
              <ListItemButton onClick={()=>navigate('/dashboardadmin/company')}>
                <ListItemText primary="Dashboard"/>
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
            <ListItemIcon>
                  <img src={category} style={{width:30}}/>
                </ListItemIcon>
              <ListItemButton onClick={()=>navigate('/dashboardadmin/displayallcategory')}>
                <ListItemText primary="All Categories"/>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
            <ListItemIcon>
                  <img src={subcategory} style={{width:28}}/>
                </ListItemIcon>
              <ListItemButton onClick={()=>navigate('/dashboardadmin/displayallsubcategory')}>
                <ListItemText primary="Sub-Categories" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
            <ListItemIcon>
                  <img src={skill} style={{width:30}}/>
                </ListItemIcon>
              <ListItemButton onClick={()=>navigate('/dashboardadmin/displayallrequiredskills')}>
                <ListItemText primary="All Job Skills" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
            <ListItemIcon>
                  <img src={verification} style={{width:28}}/>
                </ListItemIcon>
              <ListItemButton>
                <ListItemText primary="Company Verification" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
            <ListItemIcon>
                  <img src={companies} style={{width:28}}/>
                </ListItemIcon>
              <ListItemButton onClick={()=>navigate('/dashboardadmin/displayallcompany')}>
                <ListItemText primary="List Company" />
              </ListItemButton>
            </ListItem>
               
           
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
          <ListItem disablePadding>
            <ListItemIcon>
                  <img src={reports} style={{width:28}}/>
                </ListItemIcon>
              <ListItemButton>
                <ListItemText primary="Reports" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemIcon>
                  <img src={shutdown} style={{width:28}}/>
                </ListItemIcon>
              <ListItemButton>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>

    )
  }


  return (
    <div style={{display:'flex',flexDirection:'column'}}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
        <div style={{display:'flex',alignItems:'center',flexGrow:1}} >
    <div style={{marginLeft:5,marginTop:5}}>
        <img src='/spider.png' style={{width:40}}/>
    </div>
    <div style={{fontWeight:700,fontSize:24}}  >
      JobsSpider
    </div>
    </div>
         <div style={{display:'flex',alignItems:'center'}}>
         {/* <div style={{fontWeight:'bold',marginRight:5}}>
         {adminData.firstname}
         </div>
         
         <Avatar alt="Sandeep Sappal"  src={`${serverURL}/images/${adminData.picture}`} /> */}
         </div>
        </Toolbar>
      </AppBar>
      
    </Box>
    <Grid container  spacing={30}>
        <Grid item xs={4}>
         {menuList()}
        </Grid>
        <Grid item xs={8}>
          
          <Routes>
              <Route element={<DisplayAllCategory />} path={'/displayallcategory'}/>
              <Route element={<Category />} path={'/category'}/>
              <Route element={<Company />} path={'/company'}/>
              <Route element={<DisplayAllSubCategory />} path={'/displayallsubcategory'}/>
              <Route element={<SubCategory />} path={'/subcategory'}/>
              <Route element={<RequiredSkills />} path={'/requiredskills'}/>
              <Route element={<DisplayAllRequiredSkills />} path={'/displayallrequiredskills'}/>
              <Route element={<Company />} path={'/company'}/>
              <Route element={<DisplayAllCompany />} path={'/displayallcompany'}/>
              <Route element={<DisplayAllCompanyJobs />} path={'/displayallcompanyjobs'}/>


          </Routes>
    
        </Grid>
        
        
    </Grid>
    </div>
  );
}
