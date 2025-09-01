import React from 'react';
import { Paper } from "@mui/material";
import {serverURL} from "../../services/FetchNodeServices"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InterpreterModeRoundedIcon from '@mui/icons-material/InterpreterModeRounded';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeIcon from '@mui/icons-material/Home';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useNavigate } from 'react-router-dom'
/*const jobData = [
    {
      companyid: 1,
      companyname: 'Tata Consultancy Services (TCS)',
      technology: 'IT Services, Cloud Computing, AI, Big Data',
      logo: 'tcs.png',
      address: 'Mumbai, Maharashtra, India',
      salary: '₹4,00,000 - ₹10,00,000 per annum',
      jobType: ['Work From Office', 'Work From Home', 'Hybrid', 'Contractual'],
    },
    {
      companyid: 2,
      companyname: 'Infosys Ltd',
      technology: 'IT Services, Data Analytics, Automation',
      logo: 'infosys.png',
      address: 'Bengaluru, Karnataka, India',
      salary: '₹3,50,000 - ₹9,00,000 per annum',
      jobType: ['Full-Time', 'Part-Time', 'Work From Office', 'Remote'],
    },
    {
      companyid: 3,
      companyname: 'Wipro Ltd',
      technology: 'Cybersecurity, Cloud Solutions, AI/ML',
      logo: 'wipro.png',
      address: 'Bengaluru, Karnataka, India',
      salary: '₹4,00,000 - ₹8,00,000 per annum',
      jobType: ['Internship', 'Work From Home', 'Freelance', 'Full-Time'],
    },
    {
      companyid: 4,
      companyname: 'HCL Technologies',
      technology: 'Software Development, Cloud Solutions, IoT',
      logo: 'hcl.png',
      address: 'Noida, Uttar Pradesh, India',
      salary: '₹4,20,000 - ₹9,50,000 per annum',
      jobType: ['Work From Office', 'Contractual', 'Part-Time', 'Hybrid'],
    },
    {
        companyid: 5,
        companyname: 'Wipro Ltd',
        technology: 'Cybersecurity, Cloud Solutions, AI/ML',
        logo: 'wipro.png',
        address: 'Bengaluru, Karnataka, India',
        salary: '₹4,00,000 - ₹8,00,000 per annum',
        jobType: ['Internship', 'Work From Home', 'Freelance', 'Full-Time'],
      },
      {
        companyid: 7,
        companyname: 'HCL Technologies',
        technology: 'Software Development, Cloud Solutions, IoT',
        logo: 'hcl.png',
        address: 'Noida, Uttar Pradesh, India',
        salary: '₹4,20,000 - ₹9,50,000 per annum',
        jobType: ['Work From Office', 'Contractual', 'Part-Time', 'Hybrid'],
      },
      {
          companyid: 8,
          companyname: 'Wipro Ltd',
          technology: 'Cybersecurity, Cloud Solutions, AI/ML',
          logo: 'wipro.png',
          address: 'Bengaluru, Karnataka, India',
          salary: '₹4,00,000 - ₹8,00,000 per annum',
          jobType: ['Internship', 'Work From Home', 'Freelance', 'Full-Time'],
        },
        {
          companyid: 9,
          companyname: 'HCL Technologies',
          technology: 'Software Development, Cloud Solutions, IoT',
          logo: 'hcl.png',
          address: 'Noida, Uttar Pradesh, India',
          salary: '₹4,20,000 - ₹9,50,000 per annum',
          jobType: ['Work From Office', 'Contractual', 'Part-Time', 'Hybrid'],
        },
        {
            companyid: 10,
            companyname: 'Wipro Ltd',
            technology: 'Cybersecurity, Cloud Solutions, AI/ML',
            logo: 'wipro.png',
            address: 'Bengaluru, Karnataka, India',
            salary: '₹4,00,000 - ₹8,00,000 per annum',
            jobType: ['Internship', 'Work From Home', 'Freelance', 'Full-Time'],
          },
          {
            companyid: 11,
            companyname: 'HCL Technologies',
            technology: 'Software Development, Cloud Solutions, IoT',
            logo: 'hcl.png',
            address: 'Noida, Uttar Pradesh, India',
            salary: '₹4,20,000 - ₹9,50,000 per annum',
            jobType: ['Work From Office', 'Contractual', 'Part-Time', 'Hybrid'],
          },
          {
              companyid: 12,
              companyname: 'Wipro Ltd',
              technology: 'Cybersecurity, Cloud Solutions, AI/ML',
              logo: 'wipro.png',
              address: 'Bengaluru, Karnataka, India',
              salary: '₹4,00,000 - ₹8,00,000 per annum',
              jobType: ['Internship', 'Work From Home', 'Freelance', 'Full-Time'],
            },
       
  ];
  */
  export default function MiddleFilterComponent({jobData}) {
    //alert(JSON.stringify(jobData))
     const navigate=useNavigate()
     const theme = useTheme();
     const matches = useMediaQuery(theme.breakpoints.down('sm'));
     const boxList=(data)=>{
      return data.map((item, index) => {
        return <div
          key={index}
          style={{
            display: 'flex',
            padding: '5px 5px',
            alignItems: 'center',
            borderRadius: 3,
            marginRight: 5,
            marginBottom: 5,
            backgroundColor: 'rgb(242 242 243)',
          }}
        >
         
          <p style={{ fontSize: 12, margin: 0, color: 'rgb(131, 133, 143)' }}>{item.cityname}</p>
        </div>
     })

     } 
  const handleNextPage=(job)=>{
    const queryString = new URLSearchParams(job).toString();
    navigate(`/showjobscards?${queryString}`);
 

  }

   const showJobsList=()=>{
     return jobData.map((job) => {
         return(<Paper
            key={job.companyid}
            elevation={1}
            style={{
              backgroundColor: 'white',
              margin:5,
              padding:8,
              
              width:matches?'95%':'32vw',
             maxHeight:'auto',
              borderRadius:10,
              
              cursor:'pointer',
              
            }}
            onClick={()=>handleNextPage(job)}
          > 
       
           
          <div  style={{ display: 'flex', padding: '5px 10px', alignItems: 'center', borderRadius: 3, marginRight: 5, marginBottom: 5, background:'linear-gradient(90deg, rgb(255, 243, 237) 0%, rgb(255, 255, 255) 100%)'}}  >
             <img src='fire.png'style={{ width: '18px', height: '15px', color:' rgb(222, 55, 0)' }} />
             <p style={{ fontSize:16, margin: 0, color:'orange' }}>Urgent Hiring</p>
             </div>

            <div style={{ display: 'flex', flexDirection: 'row', marginRight:1 }}>
            <img src={`${serverURL}/images/${job.logo}`} alt={job.companyname} style={{ width:'auto', maxWidth:'10%',objectFit:'contain'}} />
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 'bold', margin: 0 }}>{job.categoryname} {job.subcategoryname}</div>
                <div style={{ fontSize: 12, color: 'rgb(131, 133, 143)' }}>{job.companyname}</div>
              </div>
              <KeyboardArrowRightIcon
                style={{ color: '#b03a84', width: '25px', height: '25px', marginLeft: 'auto', marginTop:0 }}
              />
            </div>
  
            <div style={{ display: 'flex',justifyContent:'center', flexDirection: 'column',marginTop:10 }}>
              <div >
                {job.jobtype.toLowerCase()=="work for home"?<div style={{display:'flex',alignItems:'center',marginTop:10}}><HomeIcon  style={{fontSize:'16',  color: 'rgb(131, 133, 143)',marginRight:10 }}/><span style={{ fontSize: 16,  color: 'rgb(131, 133, 143)'}}>{job.jobtype}</span></div>:
              <div style={{display:'flex',alignItems:'center'}}><LocationOnIcon
                  style={{ fontSize:18, color: 'rgb(131, 133, 143)',marginRight:10 }}
                />
                <div style={{display:'flex', fontSize: 16,  color: 'rgb(131, 133, 143)' }}>{boxList(JSON.parse(job.worklocationcity))}</div>
              </div>}
              </div>
              </div>
             
              <div style={{ display: 'flex',  flexDirection: 'row',alignItems:'center',marginTop:10 }}>
                <PaymentsOutlinedIcon
                  style={{fontSize:16,  color: 'rgb(131, 133, 143)',marginRight:10 }}
                />
                <div style={{ fontSize: 16, color: 'rgb(131, 133, 143)' }}>&#8377; {job.minsalary} to &#8377; {job.maxsalary}</div>
              </div>
  
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
                {[{icon:<BusinessOutlinedIcon style={{fontSize:16}}/>,entities:job.jobtype},{icon:<AccessTimeOutlinedIcon style={{fontSize:16}}/>,entities:job.schedule},{icon:<SchoolOutlinedIcon style={{fontSize:16}}/>,entities:job.experience}].map((type, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      padding: '5px 5px',
                      alignItems: 'center',
                      borderRadius: 3,
                      marginRight: 5,
                      marginBottom: 5,
                      backgroundColor: 'rgb(242 242 243)',
                    }}
                  >
                    
                    <div style={{display:'flex',alignItems:'center', fontSize: 12, margin: 0, color: 'rgb(131, 133, 143)' }}><span style={{marginRight:5}}>{type.icon}</span> <span>{type.entities}</span></div>
                  </div>
                ))}
              </div>
            
          </Paper>)})
    
      
      
    
  }

return(
  <div style={{  height: 'auto', display: 'flex', flexDirection:'column' }}>
  {showJobsList()}
  <Stack spacing={2} direction="row" style={{display:'flex',justifyContent:'center',margin:10}}>
        <Pagination
          count={10}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              component="button"
              sx={{
                fontSize: "12px",
                fontWeight: "400",
                textTransform: "none",   
                minWidth: "32px",
                height: "32px",
                borderRadius: "4px",
                border: '0 solid #e5e7eb',
                cursor: 'pointer',
                backgroundColor: '#ffff',
                WebkitTapHighlightColor:'transparent',
                margin:0.5,  
              }}
              
              slots={{
                previous: () => <>Prev</>,
                next: () => <>Next</>,
              }}
            />
          )}
        />
      </Stack>

</div>


)
}
  