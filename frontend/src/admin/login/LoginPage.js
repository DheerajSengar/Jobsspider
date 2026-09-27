import React, { useState } from 'react';
import { Button, CssBaseline, FormControl, FormLabel, TextField, Typography, Stack, Card as MuiCard } from '@mui/material';
import { styled } from '@mui/material/styles';
import { postData } from '../../services/api/FetchNodeServices';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(5),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '480px',
  borderRadius: '16px',
  boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.12)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(255, 255, 255, 0.8)'
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    animation: 'pulse 15s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
  }
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
            <img src="/spider.png" style={{ width: 48, height: 48 }} alt="JobsSpider Admin" />
            <Typography variant="h4" style={{ fontWeight: 900, color: '#667eea', fontFamily: 'Ubuntu', letterSpacing: -0.5 }}>
              JobsSpider
            </Typography>
          </div>

          <Typography component="h2" variant="h5" style={{ fontWeight: 700, marginBottom: 8, textAlign: 'center', color: '#2d3748' }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body2" style={{ color: '#718096', marginBottom: 24, textAlign: 'center' }}>
            Sign in to manage your job portal
          </Typography>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FormControl fullWidth>
              <FormLabel style={{ marginBottom: 8, fontWeight: 600, color: '#4a5568' }}>Email Address / Mobile</FormLabel>
              <TextField
                value={emailid}
                onChange={(e) => setEmailid(e.target.value)}
                placeholder="admin@jobspider.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#e2e8f0',
                      borderRadius: 8,
                    },
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel style={{ marginBottom: 8, fontWeight: 600, color: '#4a5568' }}>Password</FormLabel>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#e2e8f0',
                      borderRadius: 8,
                    },
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                padding: '14px 0',
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'none',
                marginTop: 16,
                borderRadius: 8,
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                },
                '&:disabled': {
                  background: '#cbd5e0',
                }
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



