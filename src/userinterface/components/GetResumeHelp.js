import { Button } from "@mui/material"
export default function GetResumeHelp()
{
   return(
    <div style={{backgroundColor:'#f3f4ff',width:'100%',height:350 ,marginTop:100 ,display:'flex',justifyContent:'center'}}>
    <div style={{marginLeft:5}}>
     <img src='/girls.png' style={{height:330 ,marginTop:18}}/>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 60}}>
<div style={{fontSize: 30, fontWeight: 'bolder', display: 'flex', justifyContent: 'center'}}>
Already have a resume? Get help making it stand out to employers
</div>

<div style={{fontSize:16, marginTop:5}}>
Match with a career coach who knows your industry for an expert
resume review
</div>
<Button variant="contained"style={{ fontSize:18  ,backgroundColor:"#b03a84",borderRadius:25,color: "#ffffff", textTransform: "none",marginTop:25 }}>
<b>Get Resume Help</b> 
</Button>
<div style={{display:'flex', flexDirection:'row'}}> 
<div style={{fontSize:14, marginTop:14}}>
A service of 
</div>
<img src='/Indeedlogo.png' style={{height:30,marginTop:10,marginLeft:5 }}/>
</div> 
</div>
 <div style={{marginLeft:5,}}>
      <img src='/boy.png' style={{height:350}}/>
 </div>
 </div> 
) 
}