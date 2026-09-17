import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { postData } from '../../services/FetchNodeServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

export default function PasswordOtp({ open, setOpen, emailMobile }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = async () => {
    if (!password) {
      Swal.fire('Required', 'Please enter your password.', 'warning');
      return;
    }
    setLoading(true);
    const result = await postData('userinterface/check_password', { emailMobile, password });
    setLoading(false);

    if (result.status && result.data && !Array.isArray(result.data)) {
      dispatch({ type: 'ADD_USER', payload: result.data, token: result.token });
      setOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Welcome Back!',
        text: `Logged in as ${result.data.username || result.data.emailaddress}`,
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Failed',
        text: result.message || 'Invalid Password or Account Details.'
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle style={{ fontWeight: 'bold', fontFamily: 'Ubuntu' }}>Sign In to JobsSpider</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 15 }}>
          Enter password for <strong>{emailMobile}</strong>
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleClickOpen();
          }}
        />
      </DialogContent>
      <DialogActions style={{ padding: '16px 24px' }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleClickOpen} variant="contained" color="primary" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
