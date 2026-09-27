import { Paper } from "@mui/material";
import { serverURL } from "../../services/api/FetchNodeServices";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ReviewComponent({ item }) {
  return (
    <div style={{ height: "400px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        key={item.userreviewid}
        elevation={4}
        style={{
          width: "420px",
          height: "280px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          margin: "15px 0",
          padding: "24px",
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.15)',
          border: '1px solid rgba(102, 126, 234, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(102, 126, 234, 0.08)', filter: 'blur(30px)'}}></div>
        <div style={{position: 'relative', zIndex: 1}}>
          <img 
            src={`${serverURL}/images/${item.userpicture}`} 
            alt={item.username}
            style={{ 
              width: 85, 
              height: 95, 
              position: "absolute", 
              zIndex: 2, 
              top: 20, 
              borderRadius: "20px",
              border: '3px solid #fff',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }} 
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <strong style={{ marginLeft: "100px", fontSize: 18, color: '#1a202c', fontWeight: 800 }}>{item.username}</strong>
            
            {/* PLACED icon */}
            <div style={{ 
              border: '1px solid rgba(102, 126, 234, 0.3)', 
              marginLeft: '12px', 
              borderRadius: '20px', 
              width: '75px', 
              height: '24px', 
              display: 'flex',
              backgroundColor: 'rgba(102, 126, 234, 0.1)'
            }}>
              <div style={{ 
                backgroundColor: "#667eea", 
                borderRadius: '50%', 
                margin: '2px 0px 0px 2px', 
                width: '18px', 
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircleOutlineIcon style={{ width: '12px', color: '#fff' }} />
              </div>
              <div style={{ 
                color: '#667eea', 
                fontWeight: 800, 
                fontSize: 11, 
                marginLeft: '6px', 
                marginTop: '4px',
                letterSpacing: 0.5
              }}>
                PLACED
              </div>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: 'center', marginLeft: "100px", marginTop: 8 }}>
            <span style={{fontSize: 16, fontWeight: 700, color: '#667eea', marginRight: 8}}>
              {item.userrating}
            </span>
            <Stack spacing={1}>
              <Rating 
                name="half-rating-read" 
                defaultValue={item.userrating} 
                precision={0.5} 
                readOnly 
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#ffd700',
                  },
                  '& .MuiRating-iconEmpty': {
                    color: 'rgba(102, 126, 234, 0.2)',
                  }
                }}
              />
            </Stack>
          </div>
          <p style={{ 
            fontSize: 15, 
            fontWeight: 400, 
            fontFamily: "Ubuntu", 
            color: '#4a5568',
            lineHeight: 1.6,
            marginTop: 16,
            marginLeft: "100px"
          }}>{item.userreview}</p>
        </div>
      </Paper>
    </div>
  );
}

