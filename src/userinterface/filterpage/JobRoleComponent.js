import { Paper } from "@mui/material";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Category from "../../admin/category/Category";
import DisplayAllCategory from "../../admin/category/DisplayAllCategory";

export default function JobRole({data}){
   
      const theme = useTheme();
         const matches = useMediaQuery(theme.breakpoints.down('sm'));
return(

    <Paper elevation={0}
                style={{
                    backgroundColor: '#fffff',
                    padding:2,
                    width:matches?'100%':'50VW',
                    height: 'auto',
                    borderRadius: 18,
                    
                }}>

<div style={{ fontSize: 20, fontWeight: 'bold', margin: 15 }}>
                Job role
                    </div>
                    <div style={{ display: 'flex', flexDirection:matches?'column':'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                                <img src="department.png" style={{ width: 20, height: 20 }} />
                               <div style={{display:'flex',flexDirection:'column'}}> 
                                <div style={{fontSize:16,color:'rgb(127, 124, 124)'}}>Department </div>
                                 <div style={{fontSize:16,}}>{data.categoryname}</div>
                                 </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                                <img src="subdepartment.png" style={{ width: 20, height: 20 }} />
                                <div style={{display:'flex',flexDirection:'column'}}> 
                                <div style={{fontSize:16,color:'rgb(127, 124, 124)'}}>
                                Role / Category</div>
                                 <div style={{fontSize:16,}}>{data.subcategoryname}</div>
                                 </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', padding:matches?0:10, gap: 5, marginLeft:matches?0:150 }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                                <img src="employmenttype.png" style={{ width: 20, height: 20 }} />
                                <div style={{display:'flex',flexDirection:'column'}}> 
                                <div style={{fontSize:16,color:'rgb(127, 124, 124)'}}>Employment type</div>
                                 <div style={{fontSize:16,}}>{data.jobtype}</div>
                                 </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                                <img src="shift.png" style={{ width: 20, height: 20 }} />
                                <div style={{display:'flex',flexDirection:'column'}}> 
                                <div style={{fontSize:16,color:'rgb(127, 124, 124)'}}>
                                Shift </div>
                                 <div style={{fontSize:16,}}>{data.schedule}</div>
                                 </div>
                            </div>
                            </div>
                        </div>  
                    </div>
               



</Paper>

)





}