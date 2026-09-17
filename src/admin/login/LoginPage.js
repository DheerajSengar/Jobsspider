import React, { useState } from 'react';
import { Button, CssBaseline, FormControl, FormLabel, TextField, Typography, Stack, Card as MuiCard } from '@mui/material';
import { styled } from '@mui/material/styles';
import { postData } from '../../services/FetchNodeServices';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '450px',
  borderRadius: '12px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)'
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
}));

export default function LoginPage() {
  const navigate = useNavigate();
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!emailid || !password) {
      Swal.fire('Input Required', 'Please enter your Admin Email ID and Password.', 'warning');
      return;
    }

    setLoading(true);
    const response = await postData('admin/check_password', { emailid, password });
    setLoading(false);

    if (response.status) {
      localStorage.setItem("ADMIN", JSON.stringify(response.data));
      if (response.token) {
        localStorage.setItem("adminToken", response.token);
      }
      Swal.fire({
        icon: 'success',
        title: 'Admin Access Granted',
        text: `Welcome back, ${response.data.adminname || 'Admin'}`,
        timer: 1500,
        showConfirmButton: false
      });
      navigate("/dashboardadmin");
    } else {
      Swal.fire('Access Denied', response.message || 'Invalid Email or Password.', 'error');
    }
  };

  return (
    <div>
      <CssBaseline />
      <SignInContainer direction="column">
        <Card variant="outlined">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <img src="/spider.png" style={{ width: 36 }} alt="JobsSpider Admin" />
            <Typography variant="h5" style={{ fontWeight: 800, color: '#0d6efd', fontFamily: 'Ubuntu' }}>
              JobsSpider Admin
            </Typography>
          </div>

          <Typography component="h2" variant="h5" style={{ fontWeight: 700, marginBottom: 16 }}>
            Sign in to Dashboard
          </Typography>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FormControl fullWidth>
              <FormLabel style={{ marginBottom: 6, fontWeight: 600 }}>Email Address / Mobile</FormLabel>
              <TextField
                value={emailid}
                onChange={(e) => setEmailid(e.target.value)}
                placeholder="admin@jobspider.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel style={{ marginBottom: 6, fontWeight: 600 }}>Password</FormLabel>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              style={{
                backgroundColor: '#0d6efd',
                color: '#ffffff',
                padding: '10px 0',
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'none',
                marginTop: 8
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>
        </Card>
      </SignInContainer>
    </div>
  );
}
