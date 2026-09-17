import { Divider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from "react-router";
import ShowJobsCardDetails from "./ShowJobsCardDetails";
import ShowJobsDescription from "./ShowJobsDescription";
import FilterLastComponent from "./FilterLastComponent";
import HireCity from "../components/HireCity";
import FindJobs from "../components/JobCity";
import Popularjobs from "../components/PopularJobs";
import JobByDepartment from "../components/JobsByDepartment";
import JobAccordion from '../components/Links';
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ShowJobsCards() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const keys = new URLSearchParams(location.search);

  const categoryname = keys.get("categoryname");
  const subcategoryname = keys.get("subcategoryname");
  const companyname = keys.get("companyname");
  const companyaddress = keys.get("companyaddress");
  const statename = keys.get("statename");
  const cityname = keys.get("cityname");
  const logo = keys.get("logo");
  const minsalary = keys.get("minsalary");
  const maxsalary = keys.get("maxsalary");
  const jobtype = keys.get("jobtype");
  const experience = keys.get("experience");
  const schedule = keys.get("schedule");
  const jobdetails = keys.get("jobdetails");
  const qualification = keys.get("educationqualification");
  const benifits = keys.get("benifits");
  const worklocationcity = keys.get("worklocationcity");
  const supplementalpay = keys.get("supplementalpay");
  const applicationquestion = keys.get("applicationquestion");
  
  const data = {
    categoryname,
    subcategoryname,
    companyname,
    logo,
    minsalary,
    maxsalary,
    schedule,
    experience,
    jobtype,
    jobdetails,
    qualification,
    benifits,
    supplementalpay,
    worklocationcity,
    applicationquestion,
    companyaddress,
    statename,
    cityname
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Header />
      </div>

      <div style={{ 
        width: '100%', 
        height: '100%', 
        background: 'rgb(244 242 246)', 
        display: 'flex', 
        justifyContent: 'center' 
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          marginTop: '2%', 
          marginBottom: '2%' 
        }}>
          <ShowJobsCardDetails data={data} />
          <ShowJobsDescription data={data} />
        </div>

        {!matches && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexDirection: 'column', 
            marginLeft: 10 
          }}>
            <img 
              src="getyourdreamjob.png" 
              alt="Get your dream job"
              style={{ 
                width: 265, 
                height: 150, 
                marginTop: '10%', 
                marginBottom: 20 
              }} 
            />
            <FilterLastComponent style={{ width: '30vw' }} />
          </div>
        )}
      </div>

      <div style={{ backgroundColor: '#f5f5f5', padding: 10, marginTop: '2%' }}>
        <div style={{ width: '100%' }}>
          <FindJobs />
        </div>
        <Divider />
        <div>
          <HireCity />
        </div>
        <Divider />
        <div>
          <Popularjobs />
        </div>
        <Divider />
        <div>
          <JobByDepartment />
        </div>
        <Divider />
        <div>
          <JobAccordion />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}