import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Button,Link,Menu,MenuItem,IconButton, Divider} from '@mui/material';
import parse from 'html-react-parser';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu'; 
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DrawerComponent from './DrawerComponent';  
import PopupComponent from '../userlogin/PopupComponent';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userlogin from "../../assets/user.png"
export default function Header()
{ var location=useSelector(state=>state.user)
   var dispatch=useDispatch()
   var navigate=useNavigate()
  var homeUser=localStorage.getItem("USER") 
  console.log("User :",homeUser)
  
  if(homeUser!=null)
  { 
    
    location=JSON.parse(homeUser)
  


  }
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const options={'Jobs':['Work From Home Jobs','Part Time Jobs','Freshers Jobs','Jobs For Women','Full Time Jobs','Night Shift Jobs','International Jobs','Jobs By City','Jobs By Department', 'Jobs By Company','Jobs By Qualifications',"Others"],'Carrer Compass':['AI Resume Builder','AI Resume Checker','AI Cover Letter Generator','AI Interview'],"Degree":[],"Contest":[]}
const [popOpen,setPopOpen]=useState(false)
    var menuoptions=Object.keys(options)

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems,setMenuItems]=useState([])
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

  const userLogout=()=>{
   dispatch({type:"DELETE_USER",payload:''})
   localStorage.removeItem("USER")
   navigate("/")
  }
  const showUserDetails=()=>{
  
    return(<Menu
      id="basic-menu"
      anchorEl={anchorUser}
      open={openUser}
      onClose={handleCloseUser}
     
        onClick={handleCloseUser}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
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
      <MenuItem>{location?.status}:{location?.emailMobile}</MenuItem>
      <MenuItem>View profile</MenuItem>
      <Divider/>
      <MenuItem onClick={userLogout} >Logout</MenuItem>
      
       
    </Menu>)
  }
  const handleOpenDrawer=()=>{
    setOpenDrawer(true)
  }
  const handleClick=(event,item)=>{
    
    setAnchorEl(event.currentTarget)
   setMenuItems(options[item])
  } 
  const handleClose=()=>{
    setAnchorEl(null)

  } 
  
    const mainMenu=()=>{
      return menuoptions.map((item)=>{
        return <Button onClick={(event)=>handleClick(event,item)} style={{textTransform:"capitalize",color:'#000',fontSize:14,fontWeight:'bold'}} endIcon={<KeyboardArrowDownIcon />}>{item}</Button>
      })
    }
    
    const setMenuFormat=()=>{
      var str=`<div style="display:flex;flex-direction:column;padding:10px;">`
      for(var i=0;i<menuItems.length;)
      { 
        str+=`<div style="width:450px; display:flex;flex-direction:row;"><div style="width:220px;padding:5px; ">${menuItems[i++]}</div> <div style=" border-left:1px solid #38546d;width:50px;"></div><div style="width:200px;padding:5px;">${menuItems[i++]}</div></div>`
      }
      str+=`</div>`
      return parse(str)

       }

    const showMenuOptions=()=>{
      return menuItems.map((item,i)=>{
        
      return <MenuItem onClick={handleClose}>{item}</MenuItem>
      
    })
    }
    const handleCandidateLogin=()=>{
  setPopOpen(true)
    }

    return( <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" style={{background:'#fff'}}>
         
          <Toolbar>
          <div style={{display:'flex',alignItems:'center'}} >
          <div>{matches?<MenuIcon  onClick={handleOpenDrawer} style={{cursor:'pointer',color:'#000',marginRight:7}}/>:<></>}</div>  
        <div>
            <img src='/spider.png' style={{width:40}}/>
        </div>
       
    
        <div style={{fontWeight:700,fontSize:24,color:'#000',marginLeft:5}}>
          JobsSpider
        </div>
        </div>
        
        {matches?<></>:
        <div style={{marginLeft:30,display:'flex',alignItems:'center', flexGrow:1}}>
          {mainMenu()}
          <Menu
          anchorEl={anchorEl}
        open={open}
         onClose={handleClose}
       >  
          
          {setMenuFormat()}
        
          </Menu>
        </div>}
            
            <div style={{width:location?200:300,display:'flex',justifyContent:matches?'flex-end':'space-between',alignItems:'center'}}>
           {matches?<></>:
            <Link href="#" underline="none" style={{fontSize:16,fontWeight:600, color:"#b03a84"}}>
             Employer Login
            </Link>}
            {matches?<AccountBoxIcon  style={{fontSize:35,color:"#b03a84"}}/>:location==null?<Button   style={{width:180,textTransform:"capitalize",fontSize:14,fontWeight:'bold', background:"#b03a84",color:'#ffff'}} onClick={handleCandidateLogin}>Candidate Login</Button>:<IconButton onClick={handleClickUser}   ><img src={userlogin} style={{objectFit:'contain',maxWidth:40}} /></IconButton>}
            </div>

          </Toolbar>
        </AppBar>
       <DrawerComponent options={options} open={openDrawer} setOpenDrawer={setOpenDrawer} />
       <PopupComponent open={popOpen} setClose={setPopOpen}/>
       {showUserDetails()}
      </Box>)
}