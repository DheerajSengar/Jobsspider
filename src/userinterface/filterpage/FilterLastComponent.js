import { Button, Paper } from "@mui/material";
import GppGoodIcon from '@mui/icons-material/GppGood';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LastFilterComponent() {
     const theme = useTheme();
     const matches = useMediaQuery(theme.breakpoints.down('sm'));
    return (<div style={{ display: 'flex', }}>
        <Paper elevation={1}
            style={{
                backgroundColor: 'hsla(231, 45.90%, 78.20%, 0.39)',
                padding:5,
                width:matches?'100%':'17vw',
                height: '500px',
                borderRadius: 10,
                background: 'linear-gradient(0deg, rgba(230,230,230,0) 0%, rgba(156,195,235,0.5551470588235294) 100%)',
                // border: '0.5px solid'
                margin:5,

            }}>

            <div>
                <h3 style={{ color: 'rgb(49, 18, 203)', fontSize: 22, fontWeight: '500', margin: '5px 5px 5px 20px' }}>Login with Apna and experience more!</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <ul>
                    <li>Personalised job matches</li>
                    <li>Direct connect with HRs</li>
                    <li>Latest updates on the job</li>
                </ul>
            </div>

            <div style={{ position: 'relative' }} >
                <img src='mobile.png' style={{ width: 210, height: '330px', marginTop:matches?41:12, display: 'flex', justifySelf: 'center' }} />
                <Button variant='contained' style={{ display: 'flex', width:matches?'90%':'180px', justifySelf: 'center', color: '#ffff', background: '#b03a84', borderColor: 'green', position: 'absolute', top: 280, right:35, textTransform: 'none' }}>Create Profile</Button>
            </div>

        </Paper>
    </div>)
}