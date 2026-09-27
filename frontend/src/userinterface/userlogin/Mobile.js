import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { homeStyles } from "./HomeCss";
import mobile from '../../assets/mobile.png';

export default function Mobile() {
  const [mobileno, setMobileNo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const classes = homeStyles();
  const dispatch = useDispatch();
  const location = useSelector(state => state.user);
  const validateMobileNumber = (number) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handleClick = () => {
    if (!mobileno) {
      setError('Please enter a phone number');
      return;
    }
    
    if (!validateMobileNumber(mobileno)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setError('');
    const temp = { ...location };
    temp['emailaddress'] = mobileno;
    dispatch({ type: 'ADD_USER', payload: temp });
    navigate("/mobileotp");
  };

  return (
    <div style={{ backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: '100vh' }}>
      <div style={{ display: "flex", justifyContent: "center", padding: '20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: 12 }}>
            <img src='/spider.png' alt="JobsSpider Logo" style={{ width: 48, height: 48 }} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 28, color: '#ffffff' }}>
            JobsSpider
          </div>
        </div>
      </div>

      <div className={classes.root} style={{ display: "flex", justifyContent: "center" }}>
        <div 
          className={classes.box} 
          style={{ 
            height: 580, 
            marginTop: 20, 
            backgroundColor: 'white', 
            borderRadius: 16,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            padding: 30
          }}
        >
          <div style={{ backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: '12px', marginBottom: 24, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={mobile} 
                alt="Mobile verification"
                style={{ width: 100, height: 70, marginBottom: "8px" }} 
              />
            </div>
          </div>

          <div style={{ fontWeight: 800, fontFamily: "Ubuntu", fontSize: "20px", marginBottom: 12, textAlign: 'center', color: '#2d3748' }}>
            Verify your phone number
          </div>
          
          <div style={{ fontWeight: 400, fontSize: "14px", marginBottom: 24, color: "#718096", textAlign: 'center', lineHeight: 1.6 }}>
            To enhance your experience, we need to verify that the
            phone number associated with your account 
            belongs to you. A code will be sent to this number for verification.
          </div>

          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            border: error ? "2px solid #e53e3e" : "2px solid #e2e8f0", 
            borderRadius: "8px", 
            padding: "12px",
            marginBottom: error ? "10px" : "20px",
            transition: 'border-color 0.3s'
          }}>
            <div style={{ display: "flex", alignItems: "center", marginRight: "12px", backgroundColor: '#f7fafc', padding: '8px 12px', borderRadius: 6 }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                alt="India Flag"
                style={{ width: "24px", height: "16px", marginRight: "8px" }}
              />
              <span style={{ fontWeight: 700, color: '#4a5568' }}>+91</span>
            </div>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={mobileno}
              maxLength="10"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setMobileNo(value);
                if (error) setError('');
              }}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "16px",
                fontWeight: 500,
                color: '#2d3748'
              }}
            />
          </div>

          {error && (
            <div style={{ color: '#e53e3e', fontSize: '14px', marginBottom: '16px', fontWeight: 500 }}>
              {error}
            </div>
          )}

          <div style={{ fontWeight: 400, fontSize: "12px", marginBottom: 24, color: "#718096", lineHeight: 1.5, textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px 0' }}>
              By adding my phone number, I consent to receive calls including artificial or prerecorded calls
              from JobsSpider on the phone number provided.
            </p>
            <p style={{ margin: 0 }}>
              If you want to change your contact number, visit your Profile.
            </p>
          </div>

          <Grid size={12}>
            <Button 
              style={{ 
                marginBottom: '12px', 
                borderRadius: 8,
                padding: '14px',
                fontWeight: 700,
                fontSize: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }} 
              fullWidth 
              variant="contained" 
              onClick={handleClick}
            >
              Verify
            </Button>
          </Grid>
          <Grid size={12}>
            <Button 
              fullWidth 
              variant="text"
              style={{ 
                color: '#718096',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              Not now
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
}
