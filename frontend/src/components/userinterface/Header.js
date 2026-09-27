import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem, IconButton, Divider, Typography, Avatar } from '@mui/material';
import parse from 'html-react-parser';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DrawerComponent from './DrawerComponent';
import PopupComponent from '../../userinterface/userlogin/PopupComponent';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  var location = useSelector(state => state.user);
  var dispatch = useDispatch();
  var navigate = useNavigate();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const options = {
    'Jobs': ['Work From Home Jobs', 'Part Time Jobs', 'Freshers Jobs', 'Jobs For Women', 'Full Time Jobs', 'Night Shift Jobs', 'International Jobs', 'Jobs By City', 'Jobs By Department', 'Jobs By Company', 'Jobs By Qualifications', 'Others'],
    'Career Compass': ['AI Resume Builder', 'AI Resume Checker', 'AI Cover Letter Generator', 'AI Interview'],
    'Degree': [],
    'Contest': []
  };

  const [popOpen, setPopOpen] = useState(false);
  const menuoptions = Object.keys(options);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const open = Boolean(anchorEl);
  const [anchorUser, setAnchorUser] = useState(null);
  const openUser = Boolean(anchorUser);

  const handleClickUser = (event) => {
    setAnchorUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorUser(null);
  };

  const userLogout = () => {
    dispatch({ type: "DELETE_USER" });
    navigate("/");
  };

  const showUserDetails = () => {
    const displayName = location?.username || location?.emailaddress || location?.mobileno || location?.emailMobile || 'User';
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorUser}
        open={openUser}
        onClose={handleCloseUser}
        onClick={handleCloseUser}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.15))',
              mt: 1.5,
              borderRadius: 2,
              minWidth: 200,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box style={{ padding: '12px 16px' }}>
          <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
            {displayName}
          </Typography>
          <Typography variant="caption" style={{ color: 'gray' }}>
            {location?.emailaddress || location?.mobileno || ''}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => navigate('/searchjobs')}>
          <WorkOutlineIcon style={{ marginRight: 8, fontSize: 20, color: '#0d6efd' }} /> Browse Jobs
        </MenuItem>
        <MenuItem onClick={() => navigate('/loginpage')}>
          <AccountBoxIcon style={{ marginRight: 8, fontSize: 20, color: '#b03a84' }} /> Admin Portal
        </MenuItem>
        <Divider />
        <MenuItem onClick={userLogout} style={{ color: '#d32f2f' }}>
          Logout
        </MenuItem>
      </Menu>
    );
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setMenuItems(options[item] || []);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mainMenu = () => {
    return menuoptions.map((item) => {
      return (
        <Button
          key={item}
          onClick={(event) => handleClick(event, item)}
          style={{ textTransform: "capitalize", color: '#212529', fontSize: 14, fontWeight: 700 }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {item}
        </Button>
      );
    });
  };

  const setMenuFormat = () => {
    var str = `<div style="display:flex;flex-direction:column;padding:12px;">`;
    for (var i = 0; i < menuItems.length;) {
      const left = menuItems[i++] || '';
      const right = menuItems[i++] || '';
      str += `<div style="width:420px; display:flex;flex-direction:row;margin-bottom:6px;">
                <div style="width:200px;padding:6px 10px; cursor:pointer; font-size:14px;">${left}</div>
                ${right ? `<div style="border-left:1px solid #e0e0e0;margin:0 10px;"></div><div style="width:200px;padding:6px 10px; cursor:pointer; font-size:14px;">${right}</div>` : ''}
              </div>`;
    }
    str += `</div>`;
    return parse(str);
  };

  const handleCandidateLogin = () => {
    setPopOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderBottom: '1px solid #f0f0f0' }}>
        <Toolbar sx={{ height: 70 }}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            {matches ? <MenuIcon onClick={handleOpenDrawer} style={{ cursor: 'pointer', color: '#667eea', marginRight: 8, fontSize: 28 }} /> : <></>}
            <img src='/spider.png' style={{ width: 42, height: 42, marginRight: 10 }} alt="JobsSpider Logo" />
            <Typography variant="h5" style={{ fontWeight: 900, color: '#1a202c', fontFamily: 'Ubuntu', letterSpacing: '-0.5px', fontSize: matches ? '1.2rem' : '1.5rem' }}>
              Jobs<span style={{ color: '#667eea' }}>Spider</span>
            </Typography>
          </div>

          {!matches && (
            <div style={{ marginLeft: 40, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              {mainMenu()}
              <Menu 
                anchorEl={anchorEl} 
                open={open} 
                onClose={handleClose}
                slotProps={{
                  paper: {
                    elevation: 4,
                    sx: {
                      borderRadius: 3,
                      minWidth: 440,
                      maxHeight: 500,
                      overflow: 'auto',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                    }
                  }
                }}
              >
                {setMenuFormat()}
              </Menu>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto' }}>
            {!matches && (
              <Button
                variant="outlined"
                sx={{ 
                  textTransform: "none", 
                  fontSize: 14, 
                  fontWeight: 700, 
                  color: "#667eea",
                  padding: '8px 16px',
                  borderRadius: 2,
                  border: '2px solid #667eea',
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '2px solid #667eea'
                  }
                }}
                onClick={() => navigate('/loginpage')}
              >
                Employer / Admin Login
              </Button>
            )}

            {matches ? (
              <AccountBoxIcon style={{ fontSize: 38, color: "#667eea", cursor: 'pointer' }} onClick={handleClickUser} />
            ) : location == null ? (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#ffffff',
                  borderRadius: 8,
                  padding: '10px 24px',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
                  }
                }}
                onClick={handleCandidateLogin}
              >
                Candidate Login
              </Button>
            ) : (
              <IconButton 
                onClick={handleClickUser}
                sx={{ 
                  padding: 4,
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.1)'
                  }
                }}
              >
                {location.picture ? (
                  <Avatar src={location.picture} style={{ width: 40, height: 40, border: '2px solid #667eea' }} />
                ) : (
                  <Avatar style={{ width: 40, height: 40, backgroundColor: '#667eea', fontWeight: 800, fontSize: 16 }}>
                    {(location.username || location.emailaddress || 'U')[0].toUpperCase()}
                  </Avatar>
                )}
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <DrawerComponent options={options} open={openDrawer} setOpenDrawer={setOpenDrawer} />
      <PopupComponent open={popOpen} setClose={setPopOpen} />
      {showUserDetails()}
    </Box>
  );
}

