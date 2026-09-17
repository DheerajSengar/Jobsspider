import { TextField, Button, Divider, Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postData, generateOtp } from "../../services/FetchNodeServices";
import { useDispatch } from "react-redux";
import PasswordOtp from "./PasswordOtp";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";

export default function ReadyNextPage() {
  const [emailMobile, setEmailMobile] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!emailMobile.trim()) {
      Swal.fire('Input Required', 'Please enter your email address or mobile number.', 'warning');
      return;
    }

    setLoading(true);
    const result = await postData('userinterface/check_account', { emailMobile });
    setLoading(false);

    if (result.status && result.data && result.data.emailaddress) {
      const isEmail = emailMobile.includes("@");
      const status = isEmail ? "Email" : "Mobile";
      dispatch({
        type: "ADD_USER",
        payload: { status, emailMobile: isEmail ? result.data.emailaddress : result.data.mobileno, ot: '', loginstatus: "already exist" }
      });
      setOpen(true);
    } else {
      const ot = generateOtp();
      const isEmail = emailMobile.includes("@");
      const status = isEmail ? "Email" : "Mobile";
      dispatch({
        type: "ADD_USER",
        payload: { status, emailMobile, ot, loginstatus: "first time" }
      });
      navigate("/jobseeker");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await postData('userinterface/google_login', {
        credential: credentialResponse.credential
      });
      if (res.status && res.data) {
        dispatch({ type: 'ADD_USER', payload: res.data, token: res.token });
        Swal.fire({
          icon: 'success',
          title: 'Google Login Successful!',
          text: `Welcome, ${res.data.username || res.data.emailaddress}`,
          timer: 1500,
          showConfirmButton: false
        });
        navigate('/');
      } else {
        Swal.fire('Login Failed', res.message || 'Google authentication failed.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Google Login Service encountered an error.', 'error');
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: 50 }}>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 40, paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src='/spider.png' style={{ width: 40, marginRight: 10 }} alt="JobsSpider Logo" />
          <Typography variant="h5" style={{ fontWeight: 800, color: '#0d6efd', fontFamily: 'Ubuntu' }}>
            JobsSpider
          </Typography>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper elevation={3} style={{ width: 460, padding: 32, borderRadius: 12, backgroundColor: 'white' }}>
          <Typography variant="h5" style={{ fontWeight: 800, fontFamily: "Ubuntu", marginBottom: 8 }}>
            Ready to take the next step?
          </Typography>
          <Typography variant="body2" style={{ fontWeight: 600, color: "#495057", marginBottom: 12 }}>
            Create an account or sign in.
          </Typography>
          <Typography variant="caption" style={{ color: "#6c757d", display: "block", marginBottom: 24 }}>
            By creating an account or signing in, you agree to JobsSpider's Terms and Privacy policy.
          </Typography>

          {/* Google Login Component */}
          <Box style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => Swal.fire('Error', 'Google Sign-In was unsuccessful', 'error')}
              useOneTap
              theme="outline"
              size="large"
              width="100%"
            />
          </Box>

          <Divider style={{ margin: "20px 0", color: "#6c757d", fontSize: "0.85rem" }}>
            <b>OR</b>
          </Divider>

          <Typography variant="subtitle2" style={{ fontWeight: 700, marginBottom: 4 }}>
            Email address or phone number*
          </Typography>
          <Typography variant="caption" style={{ color: "#6c757d", display: "block", marginBottom: 12 }}>
            If using a phone number, make sure it can receive SMS messages.
          </Typography>

          <div style={{ marginBottom: 20 }}>
            <TextField
              placeholder="youremail@email.com or 10-digit mobile"
              fullWidth
              variant="outlined"
              value={emailMobile}
              onChange={(e) => setEmailMobile(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNext();
              }}
            />
          </div>

          <Button
            variant="contained"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#0d6efd",
              color: "#ffffff",
              textTransform: "none",
              padding: "10px 0",
              fontSize: "1rem",
              borderRadius: 8
            }}
            onClick={handleNext}
          >
            <b>{loading ? 'Checking...' : 'Continue →'}</b>
          </Button>
        </Paper>
      </div>

      <PasswordOtp open={open} setOpen={setOpen} emailMobile={emailMobile} />
    </div>
  );
}