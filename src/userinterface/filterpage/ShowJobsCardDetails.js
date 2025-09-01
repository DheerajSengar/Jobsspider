import { Button, Divider, Paper } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ShareIcon from '@mui/icons-material/Share';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import zIndex from "@mui/material/styles/zIndex";
import { serverURL } from "../../services/FetchNodeServices";



export default function ShowJobsCardDatails({data}) {
  
      const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('sm'));
   
    return (<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width:matches?'100%':'50Vw', height: 'auto', display: 'flex', justifyContent: 'center' }}>
     <Paper
   //   key={job.companyid}
        elevation={0}
        style={{
        backgroundColor: '#ffff',
        padding:10,
        width:matches?'100%':'50vw',
        height:matches?'auto': '320px',
        borderRadius:10,
        
     }} >

    <div style={{display:'flex'}} >
        <img src={`${serverURL}/images/${data.logo}`} style={{maxWidth:40,objectFit:'contain'}} />
       <div style={{display:'flex',flexDirection:'column'}}> 
        <div style={{fontSize:20,fontWeight:600}}>
        {data.categoryname} {data.subcategoryname}
        </div>
        <div  style={{fontSize:14,color:'rgb(124, 119, 119)'}}>
        {data.companyname}
        </div>
     </div>
    </div>

    <div style={{display:'flex',flexDirection:matches?'column':'row'}}>
        <div style={{display:'flex',alignItems:'center'}}>
        <img src="pin.png" style={{width:20,height:20}} />
         {data.jobtype}
        </div>
        <div style={{display:'flex',marginLeft:matches?'':'auto'}}>
        <img src="money.png" style={{width:20,height:20}} />
        ₹{data.minsalary}-₹{data.maxsalary} Monthly
        </div>
    </div>
    <div style={{width:matches?'100%':'50vw',flexDirection:matches?'column':'row',height:'15vh',backgroundColor:'rgb(242 242 243 / var(--tw-bg-opacity, 1))',borderRadius:15,display:'flex',alignItems:matches?'':'center',marginTop:10}}>
        <div style={{display:'flex',flexDirection:matches?'row':'column',gap:'20px',margin:10, Color:'rgb(191, 186, 186)'}} >
          <div>
          Fixed
          </div>
          <div>  ₹{data.minsalary}-₹{data.maxsalary} Monthly</div>
        </div>
        {matches?<Divider style={{width:'90%',margin:10}}/>:<></>}
        
        <div style={{display:'flex',marginLeft:matches?'10px':'100px',marginTop:10}}>
        <div style={{display:'flex',flexDirection:matches?'row':'column',gap:'20px'}} >
          <div>
          Earning Potential
          </div>
          <div> 
          ₹{data.maxsalary}</div>
        </div>
        </div>
    </div>

         <div  style={{display:'flex',flexDirection:'row',marginTop:15,gap:2}}> 
         <div style={{display:'flex',flexDirection:'row',  background:'rgb(242 242 243 / var(--tw-bg-opacity, 1))',width:150,borderRadius:2}}>
         <img src="wfh.png" style={{width:20,height:20,margin:2}} />
         <div>{data.jobtype}</div>
        </div>
        <div style={{display:'flex',flexDirection:'row',  background:'rgb(242 242 243 / var(--tw-bg-opacity, 1))',width:100,borderRadius:2}}>
         <img src="fulltime.png" style={{width:20,height:20,margin:2}} />
         <div>{data.schedule}</div>
        </div>
        <div style={{display:'flex',flexDirection:'row', background:'rgb(242 242 243 / var(--tw-bg-opacity, 1))',width:100,borderRadius:2}}>
         <img src="experience.png" style={{width:20,height:20,margin:2}} />
         <div>{data.experience}</div>
        </div>
        </div>

     <div style={{display:'flex',gap:10,marginTop:30,position:matches?'relative':'',zIndex:matches?1:''}}>
        <Button variant="contained" style={{width:matches?'80%':'40vw',height:50,border:'1px solid #b03a84',background:'#b03a84',textTransform:'none', fontWeight:700}}>Apply For Job </Button>
        <Button variant="text" style={{width:matches?'20%':'10vw', height: 50, border: '1px solid green', color:'green',background: '#ffffff'}} startIcon={<ShareIcon />}>Share</Button>
     </div>
       
    </Paper>
  </div>
    </div>)
}