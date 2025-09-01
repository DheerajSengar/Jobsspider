
import { Paper,Divider} from "@mui/material"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import JobRole from "./JobRoleComponent";
import JobRequirements from "./JobRequirementsComponent";
import AboutCompany from "./AboutCompanyComponent";
import JobDiscription from "./JobDiscriptionComponent";
 

export default function ShowJobsDiscription({data}) {

     const theme = useTheme();
     const matches = useMediaQuery(theme.breakpoints.down('sm'));
 
    return (<div style={{ width:'100%', height: 'auto',marginTop:'2%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
            <Paper elevation={0}
                style={{
                    backgroundColor:'white',
                    padding:5,
                    width:matches?'100%':'50VW',
                    height: 'auto',
                    borderRadius: 10,
                   
                   
                }}>
                <div style={{ display: "flex",background:matches?'rgb(245, 232, 232)':'#ffffff', flexDirection: "column", gap:matches?"5px":"1px" }}>
               <JobDiscription data={data} />
               {matches?<></>:<Divider style={{width:'90%',margin:10}}/>}
               <JobRole  data={data}/>
               {matches?<></>:<Divider style={{width:'90%',margin:10}}/> }
              <JobRequirements />
              {matches?<></>:<Divider style={{width:'90%',margin:10}}/>}
              <AboutCompany data={data} />
             </div>  
            
        <div style={{display:'flex',flexDirection:'row',padding:10}}>
        <div>Job posted by</div><div style={{fontWeight:'bold',marginLeft:10}}>JobsSpider Management Services</div>
        </div>
                     

              




            
            </Paper>
    </div>)
}
