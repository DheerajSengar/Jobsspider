import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import category from "../../assets/category.png";
import subcategory from "../../assets/subcategory.png";
import skill from "../../assets/skill.png";
import verification from "../../assets/verification.png";
import shutdown from "../../assets/shutdown.png";
import companies from "../../assets/company.png";
import dashboard from "../../assets/dashboard.png";
import Category from "../category/Category";
import SubCategory from "../subcategory/SubCategory";
import DisplayAllSubCategory from "../subcategory/DisplayAllSubCategory";
import RequiredSkills from "../requiredskill/RequiredSkills";
import DisplayAllCategory from "../category/DisplayAllCategory";
import DisplayAllRequiredSkills from '../requiredskill/DisplayAllRequiredSkills';
import DisplayAllCompanyJobs from '../companyjobs/DisplayAllCompanyJobs';
import Company from "../companies/Company";
import DisplayAllCompany from "../companies/DisplayAllCompany";
import CompanyVerification from "../companies/CompanyVerification";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function DashboardAdmin() {
  const navigate = useNavigate();
  let adminData = null;
  try {
    const raw = localStorage.getItem("ADMIN");
    adminData = raw ? JSON.parse(raw) : null;
  } catch (e) {
    adminData = null;
  }

  useEffect(() => {
    if (!adminData) {
      Swal.fire('Session Expired', 'Please login with Admin credentials.', 'warning');
      navigate("/loginpage");
    }
  }, [adminData, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ADMIN");
    localStorage.removeItem("adminToken");
    Swal.fire({
      icon: 'info',
      title: 'Logged Out',
      text: 'You have been logged out of the Admin Dashboard.',
      timer: 1500,
      showConfirmButton: false
    });
    navigate("/loginpage");
  };

  const menuList = () => {
    return (
      <Box sx={{ margin: "20px 0 0 20px", padding: 1, width: '100%', maxWidth: 300, border: '1px #e0e0e0 solid', borderRadius: 4, backgroundColor: '#ffffff' }}>
        <nav aria-label="admin navigation">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/dashboardadmin/displayallcompanyjobs')}>
                <ListItemIcon><img src={dashboard} style={{ width: 24 }} alt="Dashboard" /></ListItemIcon>
                <ListItemText primary="All Company Jobs" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/dashboardadmin/displayallcategory')}>
                <ListItemIcon><img src={category} style={{ width: 24 }} alt="Categories" /></ListItemIcon>
                <ListItemText primary="All Categories" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/dashboardadmin/displayallsubcategory')}>
                <ListItemIcon><img src={subcategory} style={{ width: 24 }} alt="Subcategories" /></ListItemIcon>
                <ListItemText primary="Sub-Categories" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/dashboardadmin/displayallrequiredskills')}>
                <ListItemIcon><img src={skill} style={{ width: 24 }} alt="Job Skills" /></ListItemIcon>
                <ListItemText primary="All Job Skills" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/dashboardadmin/companyverification')}>
                <ListItemIcon><img src={verification} style={{ width: 24 }} alt="Verification" /></ListItemIcon>
                <ListItemText primary="Company Verification" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/dashboardadmin/displayallcompany')}>
                <ListItemIcon><img src={companies} style={{ width: 24 }} alt="Companies" /></ListItemIcon>
                <ListItemText primary="List Companies" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>

        <Divider style={{ margin: '10px 0' }} />

        <nav aria-label="secondary navigation">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon><img src={shutdown} style={{ width: 24 }} alt="Logout" /></ListItemIcon>
                <ListItemText primary="Logout" style={{ color: '#d32f2f' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#1e293b' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/dashboardadmin')}>
              <img src='/spider.png' style={{ width: 36, marginRight: 10 }} alt="JobsSpider Admin" />
              <Typography variant="h6" style={{ fontWeight: 800, color: '#ffffff', fontFamily: 'Ubuntu' }}>
                JobsSpider <span style={{ color: '#38bdf8', fontSize: 14 }}>Admin Control</span>
              </Typography>
            </div>

            {adminData && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Typography variant="body2" style={{ color: '#e2e8f0', fontWeight: 600 }}>
                  {adminData.adminname || adminData.emailid}
                </Typography>
                <Avatar style={{ backgroundColor: '#0284c7', width: 36, height: 36 }}>
                  {(adminData.adminname || 'A')[0].toUpperCase()}
                </Avatar>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container spacing={3} style={{ padding: '20px' }}>
        <Grid size={{ xs: 12, md: 3 }}>
          {menuList()}
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Box style={{ backgroundColor: '#ffffff', padding: 24, borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <Routes>
              <Route element={<DisplayAllCompanyJobs />} path={'/displayallcompanyjobs'} />
              <Route element={<DisplayAllCategory />} path={'/displayallcategory'} />
              <Route element={<Category />} path={'/category'} />
              <Route element={<Company />} path={'/company'} />
              <Route element={<DisplayAllSubCategory />} path={'/displayallsubcategory'} />
              <Route element={<SubCategory />} path={'/subcategory'} />
              <Route element={<RequiredSkills />} path={'/requiredskills'} />
              <Route element={<DisplayAllRequiredSkills />} path={'/displayallrequiredskills'} />
              <Route element={<DisplayAllCompany />} path={'/displayallcompany'} />
              <Route element={<CompanyVerification />} path={'/companyverification'} />
              <Route element={<DisplayAllCompanyJobs />} path={'/'} />
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
