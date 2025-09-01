import { Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function AboutCompany(){
 
      const theme = useTheme();
         const matches = useMediaQuery(theme.breakpoints.down('sm'));
return(

    <Paper elevation={0}
                style={{
                    backgroundColor: '#ffff',
                    padding:2,
                    width:matches?'100%':'50VW',
                    height: 'auto',
                    borderRadius: 18,
                    
                }}>
             <div style={{ fontSize: 20, fontWeight: 'bold', margin: 15 }}>
                    About company
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                                <img src="spider.png" style={{ width: 20, height: 20 ,marginTop:5}} />
                                <div style={{display:'flex',flexDirection:'column'}}> 
                                <div style={{fontSize:16,color:'rgb(127, 124, 124)'}}>Company Name </div>
                                 <div style={{fontSize:16,}}>Arrow Point Management Services</div>
                                 </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                                <img src="address.png" style={{ width: 20, height: 20 }} />
                                <div style={{display:'flex',flexDirection:'column'}}> 
                                <div style={{fontSize:16,color:'rgb(127, 124, 124)'}}>Address</div>
                                 <div style={{fontSize:16,}}>Mohali, Punjab, India</div>
                                 </div>
                            </div>
                        </div>
                        
                    </div>
                  
 

</Paper>

)





}