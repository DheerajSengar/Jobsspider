import { Divider } from "@mui/material";

import { homeStyles } from "./HomeCss";

import React, { useEffect, useState } from 'react'
 
import SvgIcon from '@mui/material/SvgIcon';

 import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
  
 import Header from "./components/Header";
 import ScrollComponent from "./components/ScrollComponent";
  
import TrendingJobsComponent from "./components/TrendingJobsComponent";
import TwoPeopleHireComponent from "./components/TwoPeopleHireComponent";
import DownloadJobsSpider from "./components/DownloadJobsSpider"; 
import GetResumeHelp from "./components/GetResumeHelp";
import Footer from "./components/Footer"
import JobCity from "./components/JobCity"
import HireCity from "./components/HireCity"
import Popularjobs from "./components/PopularJobs"
import JobsByDepartment from "./components/JobsByDepartment"
import Links from "./components/Links"
import UserReviewComponent  from "./components/UserReviewComponent"
import trending_jobs from "./components/TrendingJobs"
import { getData } from "../services/FetchNodeServices";
import SearchBarComponent from "./components/SearchBarComponent";
import SearchJobs from "./components/SearchJobs"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  

   
    const [topCompanies,setTopCompanies]=useState([]) 
    const [trendingJobs,setTrendingJobs]=useState([])
    const fetchAllTopCompanies=async()=>{
      var res=await getData('userinterface/user_top_company_display')
      setTopCompanies(res.data)
     }
     const fetchTrendingJobs=async()=>{
      var res=await getData('userinterface/trending_jobs')
    
      setTrendingJobs(res.data)
     }
    useEffect(function(){
      fetchAllTopCompanies()
      // fetchTrendingJobs()
    },[])
    const classes = homeStyles();
    const [isClicked, setIsClicked] = useState(false);
    var color=['#e67e22','#ffeaa7','#fd79a8','#74b9ff','#2ecc71']
   var dataTrending=[{jobtypeid:5,trending:'Trending @ #1',jobtype:'Job for Freshers',color:'#e67e22',image:'freshers.webp'},
    {jobtypeid:1,trending:'Trending @ #2',jobtype:'Work from home Jobs',color:'#ffeaa7',image:'work-from-home-jobs.webp'},
    {jobtypeid:2,trending:'Trending @ #3',jobtype:'Jobs for Women',color:'#fd79a8',image:'women-jobs.webp'},
    {jobtypeid:3,trending:'Trending @ #4',jobtype:'Part time Jobs',color:'#74b9ff',image:'part-time-jobs.webp'},
    {jobtypeid:4,trending:'Trending @ #5',jobtype:'International Jobs',color:'#2ecc71',image:'international-jobs.webp'},
   ] 
    const handleClick = () => {
        setIsClicked(!isClicked);
      };


      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
   
      const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));



      function ChevronIcon(props) {
        return (
       <SvgIcon {...props}>
          <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
         </SvgIcon>
        );}

    return(

        <div style={{display:'flex',flexDirection:'column'}} >
        <Header/>

        <div>
          <SearchJobs />
        </div>
       
        
       

        <div style={{display:'flex',justifyContent:'center',width:"100%",alignItems:'center'}}>
          
          <TrendingJobsComponent items={trendingJobs} colors={color} />
          
        </div>
  

        <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
        <div style={{margin:40,width:'90%'}}>
        <ScrollComponent data={topCompanies}/>
        </div>
        </div>
          
        <div style={{width:'100%'}}>
          <UserReviewComponent/>
        </div>
        
        <div style={{width:'100%',marginTop:'10%',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}} >
         <TwoPeopleHireComponent/>
       </div>
    
       <div style={{width:'100%',marginTop:'10%',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}} > 
        <DownloadJobsSpider />
        </div>
        
       {matches?<div>
        <GetResumeHelp/>
        </div>:<></>}
    
    <div style={{width:'100%'}}>
    <JobCity />
    <Divider/>
    <HireCity />
    <Divider/>
    <Popularjobs />
    <Divider/>
    <JobsByDepartment />
    <Divider/>
    <Links/>
    

    </div>
    
 
 <div style={{width:'100%'}}>
  <Footer />
 </div>
 
    </div>

      );
    }
{/* */}