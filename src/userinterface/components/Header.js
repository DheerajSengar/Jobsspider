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
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DrawerComponent from './DrawerComponent';
import PopupComponent from '../userlogin/PopupComponent';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userlogin from "../../assets/user.png";

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
      <AppBar position="static" style={{ background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <Toolbar>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            {matches ? <MenuIcon onClick={handleOpenDrawer} style={{ cursor: 'pointer', color: '#000', marginRight: 7 }} /> : <></>}
            <img src='/spider.png' style={{ width: 36, marginRight: 8 }} alt="JobsSpider Logo" />
            <Typography variant="h6" style={{ fontWeight: 800, color: '#000', fontFamily: 'Ubuntu', letterSpacing: '-0.5px' }}>
              Jobs<span style={{ color: '#0d6efd' }}>Spider</span>
            </Typography>
          </div>

          {!matches && (
            <div style={{ marginLeft: 30, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              {mainMenu()}
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {setMenuFormat()}
              </Menu>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            {!matches && (
              <Button
                style={{ textTransform: "none", fontSize: 14, fontWeight: 700, color: "#b03a84" }}
                onClick={() => navigate('/loginpage')}
              >
                Employer / Admin Login
              </Button>
            )}

            {matches ? (
              <AccountBoxIcon style={{ fontSize: 35, color: "#b03a84", cursor: 'pointer' }} onClick={handleClickUser} />
            ) : location == null ? (
              <Button
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  fontSize: 14,
                  fontWeight: 700,
                  background: "#b03a84",
                  color: '#ffffff',
                  borderRadius: 6,
                  padding: '6px 20px'
                }}
                onClick={handleCandidateLogin}
              >
                Candidate Login
              </Button>
            ) : (
              <IconButton onClick={handleClickUser}>
                {location.picture ? (
                  <Avatar src={location.picture} style={{ width: 36, height: 36 }} />
                ) : (
                  <Avatar style={{ width: 36, height: 36, backgroundColor: '#0d6efd' }}>
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