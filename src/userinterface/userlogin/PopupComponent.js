
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
export default function PopupComponent({ open, setClose}) {
  const theme = useTheme();
  const navigate=useNavigate()
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose=()=>{
    setClose(false)
  }
  const handleNext=()=>{
    setClose(false)
    navigate("/readynextpage")

     
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: { width: matches ? '100%' : '50%', height: matches ? '80vh' : '50vh', marginBottom: matches ? 0 : 30 },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: '#000',
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          width: '100%',
          height: matches ? '100vh' : '50vh',
          padding: 0,
        }}
      >
        <div style={{ display: 'flex', flexDirection: matches ? 'column' : 'row', width: '100%', height: '50vh' }}>
          {/* Left Side */}
          <div
            style={{
              width: matches ? '100%' : '33%',
              height: '50vh',
              background: 'linear-gradient(to bottom, rgb(250, 246, 247), rgb(244, 215, 230), #e3daf6)',
              padding: matches ? 10 : 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: 20 }}>
              One account <br /> <span style={{ color: '#d81b60' }}>more benefits.</span>
            </div>

            <ul style={{ display: 'flex', flexDirection: 'column', fontSize: 14, listStyle: 'none', padding: 0, gap: '10px' }}>
              <li>
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '8px' }} /> Better job matches
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '8px' }} /> Reach more employers
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '8px' }} /> Enhanced security
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '8px' }} /> Maintain a single profile
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div
            style={{
              width: matches ? '100%' : '67%',
              height: '50vh',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 30,
                background: 'linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(204,16,16,1) 74%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              JobsSpider
            </div>

            <div style={{ padding: 20, fontWeight: 'bold', fontSize: '18px' }}>
              We are partnering with Numeric infosystem to provide you with one account for both platforms.
            </div>

            <div style={{ padding: 10, color: 'gray', fontSize: '14px' }}>
              Create a new account or login with your existing JobsSpider credentials to connect with Numeric infosystem Pvt. Ltd.{' '}
              <a href="#" style={{ color: '#1565c0', textDecoration: 'none' }}>Learn more</a> about this partnership.
            </div>

            <button
              style={{
                backgroundColor: '#d81b60',
                color: '#fff',
                border: 'none',
                padding: '15px',
                marginTop: matches ? '50px' : '0px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: 18,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={handleNext}
            >
              Sign In or Sign Up
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}





