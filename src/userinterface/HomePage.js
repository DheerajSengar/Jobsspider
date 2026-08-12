import React, { useEffect, useState } from 'react';
import { Divider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { homeStyles } from "./HomeCss";
import Header from "./components/Header";
import ScrollComponent from "./components/ScrollComponent";
import TrendingJobsComponent from "./components/TrendingJobsComponent";
import TwoPeopleHireComponent from "./components/TwoPeopleHireComponent";
import DownloadJobsSpider from "./components/DownloadJobsSpider";
import GetResumeHelp from "./components/GetResumeHelp";
import Footer from "./components/Footer";
import JobCity from "./components/JobCity";
import HireCity from "./components/HireCity";
import Popularjobs from "./components/PopularJobs";
import JobsByDepartment from "./components/JobsByDepartment";
import Links from "./components/Links";
import UserReviewComponent from "./components/UserReviewComponent";
import { getData } from "../services/FetchNodeServices";
import SearchJobs from "./components/SearchJobs";
export default function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = homeStyles();
  
  const [topCompanies, setTopCompanies] = useState([]);
  const [trendingJobs, setTrendingJobs] = useState([]);
  
  const color = ['#e67e22', '#ffeaa7', '#fd79a8', '#74b9ff', '#2ecc71'];

  const fetchAllTopCompanies = async () => {
    try {
      const res = await getData('userinterface/user_top_company_display');
      if (res && res.data) {
        setTopCompanies(res.data);
      }
    } catch (error) {
      console.error('Error fetching top companies:', error);
      setTopCompanies([]);
    }
  };

  const fetchTrendingJobs = async () => {
    try {
      const res = await getData('userinterface/trending_jobs');
      if (res && res.data) {
        setTrendingJobs(res.data);
      }
    } catch (error) {
      console.error('Error fetching trending jobs:', error);
      setTrendingJobs([]);
    }
  };

  useEffect(() => {
    fetchAllTopCompanies();
    fetchTrendingJobs();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div>
        <SearchJobs />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: "100%", alignItems: 'center' }}>
        <TrendingJobsComponent items={trendingJobs} colors={color} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ margin: 40, width: '90%' }}>
          <ScrollComponent data={topCompanies} />
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <UserReviewComponent />
      </div>

      <div style={{ width: '100%', marginTop: '10%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <TwoPeopleHireComponent />
      </div>

      <div style={{ width: '100%', marginTop: '10%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <DownloadJobsSpider />
      </div>

      {matches && (
        <div>
          <GetResumeHelp />
        </div>
      )}

      <div style={{ width: '100%' }}>
        <JobCity />
        <Divider />
        <HireCity />
        <Divider />
        <Popularjobs />
        <Divider />
        <JobsByDepartment />
        <Divider />
        <Links />
      </div>

      <div style={{ width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
}