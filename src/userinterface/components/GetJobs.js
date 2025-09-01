import { Paper } from "@mui/material"
import {serverURL} from "../../services/FetchNodeServices"

export default function GetJobs({item})
{
    return(
    <div style={{display:'flex'}}>
       <Paper elevation={1} style={{width:250,height:80,borderRadius:50,border:'0.5px solid #f1f2f6',display:'flex',flexDirection:'row',alignItems:'center'}}>
        <div >
         <img src={`${serverURL}/images/${item.picture}`} style={{width:50,height:50,borderRadius:'50%',marginLeft:10,marginRight:10 }} />
         </div>
                     <div style={{fontSize:15,fontWeight:'bold',marginRight:10}}>
                {item.candidatename} {item.title}</div>
        
        
        </Paper>
        
    </div>
    )
}