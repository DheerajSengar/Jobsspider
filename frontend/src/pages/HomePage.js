import React, { useEffect, useState } from 'react';
import { Divider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Header from "../components/userinterface/Header";
import ScrollComponent from "../components/userinterface/ScrollComponent";
import TrendingJobsComponent from "../components/userinterface/TrendingJobsComponent";
import TwoPeopleHireComponent from "../components/userinterface/TwoPeopleHireComponent";
import DownloadJobsSpider from "../components/userinterface/DownloadJobsSpider";
import GetResumeHelp from "../components/userinterface/GetResumeHelp";
import Footer from "../components/userinterface/Footer";
import JobCity from "../components/userinterface/JobCity";
import HireCity from "../components/userinterface/HireCity";
import Popularjobs from "../components/userinterface/PopularJobs";
import JobsByDepartment from "../components/userinterface/JobsByDepartment";
import Links from "../components/userinterface/Links";
import UserReviewComponent from "../components/userinterface/UserReviewComponent";
import { getData } from "../services/api/FetchNodeServices";
import SearchJobs from "../components/userinterface/SearchJobs";
export default function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  
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

