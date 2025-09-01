import TrendingJobs from "./TrendingJobs"
import { Paper } from "@mui/material"
export default function TrendingJobsComponent({items,colors})
{
  
 const showTrendingJobs=()=>{
    return items.map((item,i)=>{
        return <TrendingJobs item={item} colors={colors[i]}/>
    })
 }
    return(<div style={{margin:10,display:'flex',justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
         <Paper
         
        elevation={0}
        style={{
          padding: "30px 20px 30px 20px",
          width: 360,
          height: 280,
          borderRadius: 18,
          fontWeight:'bold',
          fontSize:56,
           
          margin:15,

        }}
      > Trending Jobs on JobsSpider </Paper>
        {showTrendingJobs()}
      </div>)
      
}