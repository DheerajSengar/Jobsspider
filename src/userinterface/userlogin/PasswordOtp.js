import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Restaurant } from '@mui/icons-material';
import { postData } from '../../services/FetchNodeServices';
import { useNavigate } from 'react-router-dom';
export default function PasswordOtp({open,setOpen,emailMobile}) {
  var [password,setPassword]=React.useState('')
  var navigate=useNavigate()
  const handleClickOpen = async() => {
  var result=await postData('userinterface/check_password',{emailMobile,password})
  if(result.status)  
  {
    navigate("/")
  }
  else
  {
    alert("Invalid Password")
  }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      
      <Dialog
        open={open}
        onClose={handleClose}
   
       
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Sign in for {emailMobile}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Enter Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickOpen}>Login</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
