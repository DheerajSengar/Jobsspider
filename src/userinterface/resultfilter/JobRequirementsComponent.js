import { Paper } from "@mui/material";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function JobRequirements(){
 
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
                    Job requirements
                    </div>
                    <div style={{ display: 'flex', flexDirection:matches?'column':'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                                <img src="experience.png" style={{ width: 20, height: 20 }} />
                                <div style={{display:'flex',flexDirection:'column'}}> 
                                <div style={{fontSize:16,color:'rgb(127, 124, 124)'}}>
                                Experience </div>
                                 <div style={{fontSize:16,}}>Min. 5 years</div>
                                 </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                                <img src="education.png" style={{ width: 20, height: 20 }} />
                                <div style={{display:'flex',flexDirection:'column'}}> 
                                <div style={{fontSize:16,color:'rgb(127, 124, 124)'}}>Education </div>
                                 <div style={{fontSize:16,}}>  Graduate</div>
                                 </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', padding:matches?0:10, gap: 5, marginLeft:matches?0:210 }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                                <img src="englishlevel.png" style={{ width: 20, height: 20 }} />
                                <div style={{display:'flex',flexDirection:'column'}}> 
                                <div style={{fontSize:16,color:'rgb(127, 124, 124)'}}>English level </div>
                                 <div style={{fontSize:16,}}>Good (Intermediate / Advanced) English</div>
                                 </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                                <img src="gender.png" style={{ width:15, height:15,color:'rgb(156, 150, 150)' }} />
                                <div style={{display:'flex',flexDirection:'column'}}> 
                                <div style={{fontSize:16,color:'rgb(127, 124, 124)'}}>Gender </div>
                                 <div style={{fontSize:16,}}>Any Gender</div>
                                 </div>
                            </div>
                            </div>
                        </div>  
                    </div>
                   


</Paper>

)





}