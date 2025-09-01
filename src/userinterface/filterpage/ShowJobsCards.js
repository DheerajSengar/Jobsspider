import ShowJobsCardDatails from "./ShowJobsCardDetails"
import ShowJobsDiscription from "./ShowJobsDiscription"
import FilterLastCompoennt from "./FilterLastComponent"
import FilterMiddleComponent from "./FilterMiddleComponent";
import Hirecity from "../components/HireCity"
import FindJobs from "../components/JobCity";
import Popularjobs from "../components/PopularJobs";
import JobByDepartment from "../components/JobsByDepartment";
import JobAccordion from '../components/Links';
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Divider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from "react-router";
export default function ShowJobsCards()
{
     const theme = useTheme();
     const matches = useMediaQuery(theme.breakpoints.down('sm'));
     const location = useLocation();
  console.log(location.search);
  const keys = new URLSearchParams(location.search);
  console.log("Keys:",keys)

  var categoryname = keys.get("categoryname");
  var subcategoryname = keys.get("subcategoryname");
  var companyname=keys.get("companyname")
  var companyaddress=keys.get("companyaddress")
  var statename=keys.get("statename")
  var cityname=keys.get("cityname")

  var logo=keys.get("logo")
  var minsalary=keys.get("minsalary")
  var maxsalary=keys.get("maxsalary")
  var jobtype=keys.get("jobtype")
  var experience=keys.get("experience")
  var schedule=keys.get("schedule")
  var jobdetails=keys.get("jobdeatails")
  var skills=keys.get("skills")
  var qualification=keys.get("educationqualification")
  var benifits=keys.get("benifits")
  var worklocationcity=keys.get("worklocationcity")
  var supplementalpay=keys.get("supplementalpay")
  var applicationquestion=keys.get("applicationquestion")
  var data={categoryname,subcategoryname,companyname,logo,minsalary,maxsalary,schedule,experience,jobtype,jobdetails,qualification,benifits,supplementalpay,worklocationcity,applicationquestion,companyaddress,statename,cityname} 



  


 // var skill_id = keys.get("skillid");
  //var categoryid = keys.get("categoryid");
  //var subcategoryid = keys.get("subcategoryid");
  //console.log("Skills:",skill)

  
    return(
      
        <div style={{ display: 'flex', flexDirection: 'column' }} >
         <div> < Header  /> </div>
         <div style={{width:'100%',height:'100%',background:'rgb(244 242 246)',display:'flex',justifyContent:'center'}}>  
         <div style={{display:'flex',flexDirection:'column',marginTop:'2%',marginBottom:'2%'}}>
              <ShowJobsCardDatails data={data} />
              <ShowJobsDiscription data={data} />
            </div>
         
         
            {matches?<></>: <div  style={{display:'flex',alignItems:'center',flexDirection:'column',marginLeft:10}}>
                <img src="getyourdreamjob.png"  style={{width:265,height:150,marginTop:'10%',marginBottom:20}}/>
                <FilterLastCompoennt style={{ width:'30vw'}} />
            </div>}
         
          

    </div>
 


    <div style={{ backgroundColor: '#f5f5f5', padding:10 ,marginTop:'2%' }}>
        <div style={{width:'100%'}}>
          < FindJobs />
        </div>
        <Divider />
         <div>
          < Hirecity />
        </div>
        <Divider />
        <div>
          <Popularjobs />
        </div>
        <Divider />
        <div>
          < JobByDepartment />
        </div>
        <Divider />
        <div>
          <JobAccordion />
        </div>
      </div>

      <div >
        <Footer />
      </div>
          
    </div>)
}

{/**
  
    <div style={{width:'100%',height:'100%',background:'rgb(209, 227, 227)',display:'flex',justifyContent:'center'}}>
            <div style={{display:'flex',flexDirection:'column',marginTop:40}}>
              <ShowJobsCardDatails />
              <ShowJobsDiscription />
            </div>
         
           {matches?<></>: <div  style={{display:'flex',flexDirection:'column',marginLeft:20}}>
                <img src="getyourdreamjob.png"  style={{width:265,height:180,marginTop:40,marginBottom:20}}/>
                <FilterLastCompoennt />
            </div>}
   </div>
  <div >
       <div style={{marginTop:50}}>
        <FilterMiddleComponent />
       </div>

        <Footer />
      </div>
  
  
  */}