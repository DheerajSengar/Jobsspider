import { Button } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function GetResumeHelp()
{
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  
   return(
    <div style={{
      backgroundColor:'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
      width:'100%',
      height:matches?'auto':400,
      marginTop:matches?60:100,
      marginBottom:matches?60:100,
      display:'flex',
      justifyContent:'center',
      alignItems: 'center',
      padding: matches?20:40,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(102, 126, 234, 0.08)', filter: 'blur(50px)'}}></div>
      <div style={{position: 'absolute', bottom: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(118, 75, 162, 0.08)', filter: 'blur(40px)'}}></div>
      
    <div style={{marginLeft:5, position: 'relative', zIndex: 1}}>
     <img src='/girls.png' style={{height:matches?280:330 ,marginTop:matches?10:18}} alt="Resume Help Female Illustration" />
    </div>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: matches?30:60, position: 'relative', zIndex: 1, padding: '0 20px'}}>
<div style={{
  fontSize: matches?24:32, 
  fontWeight: 900, 
  display: 'flex', 
  justifyContent: 'center',
  textAlign: 'center',
  color: '#1a202c',
  fontFamily: 'Ubuntu',
  lineHeight: 1.3,
  maxWidth: matches?'100%':'600px'
}}>
Already have a resume? Get help making it stand out to employers
</div>

<div style={{
  fontSize:matches?15:18, 
  marginTop:16,
  textAlign: 'center',
  color: '#4a5568',
  lineHeight: 1.6,
  maxWidth: matches?'100%':'500px'
}}>
Match with a career coach who knows your industry for an expert
resume review
</div>
<Button 
  variant="contained"
  sx={{
    fontSize:matches?16:18,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 3,
    color: "#ffffff", 
    textTransform: "none",
    marginTop: 30,
    padding: '12px 32px',
    fontWeight: 800,
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
    }
  }}
>
<b>Get Resume Help</b> 
</Button>
<div style={{display:'flex', flexDirection:'row', alignItems: 'center', marginTop: 20}}> 
<div style={{fontSize:14, color: '#718096', fontWeight: 500}}>
A service of 
</div>
<img src='/Indeedlogo.png' style={{height:28,marginTop:4,marginLeft:8 }} alt="Indeed Logo" />
</div> 
</div>
 <div style={{marginLeft:5, position: 'relative', zIndex: 1}}>
      <img src='/boy.png' style={{height:matches?300:350}} alt="Resume Help Male Illustration" />
 </div>
 </div> 
) 
}
