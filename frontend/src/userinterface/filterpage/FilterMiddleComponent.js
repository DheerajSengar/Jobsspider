import React from 'react';
import { Paper, Typography } from "@mui/material";
import { serverURL } from "../../services/api/FetchNodeServices";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import WorkOffOutlinedIcon from '@mui/icons-material/WorkOffOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

export default function MiddleFilterComponent({ jobData = [] }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const parseCities = (cityData) => {
    if (!cityData) return [];
    if (Array.isArray(cityData)) return cityData;
    try {
      const parsed = JSON.parse(cityData);
      if (Array.isArray(parsed)) return parsed;
      return [{ cityname: String(parsed) }];
    } catch (e) {
      return [{ cityname: String(cityData) }];
    }
  };

  const handleNextPage = (job) => {
    if (job.jobid) {
      navigate(`/job/${job.jobid}`);
    } else {
      // Fallback: pass data as query params if jobid is missing
      const queryString = new URLSearchParams({
        ...job,
        worklocationcity: typeof job.worklocationcity === 'object' ? JSON.stringify(job.worklocationcity) : (job.worklocationcity || '')
      }).toString();
      navigate(`/showjobscards?${queryString}`);
    }
  };

  if (!jobData || jobData.length === 0) {
    return (
      <Paper
        elevation={0}
        style={{
          padding: 40,
          textAlign: 'center',
          width: matches ? '95%' : '32vw',
          margin: 10,
          borderRadius: 12,
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0'
        }}
      >
        <WorkOffOutlinedIcon style={{ fontSize: 48, color: '#9e9e9e', marginBottom: 12 }} />
        <Typography variant="h6" style={{ fontWeight: 700, color: '#424242' }}>
          No jobs found matching your filters
        </Typography>
        <Typography variant="body2" style={{ color: '#757575', marginTop: 8 }}>
          Try adjusting your search criteria, experience level, or date posted options.
        </Typography>
      </Paper>
    );
  }

  const showJobsList = () => {
    return jobData.map((job, idx) => {
      const cities = parseCities(job.worklocationcity);
      const companyLogo = job.companylogo || job.logo || 'spider.png';
      const logoUrl = companyLogo.startsWith('http') ? companyLogo : `${serverURL}/images/${companyLogo}`;

      return (
        <Paper
          key={job.jobid || idx}
          elevation={1}
          style={{
            backgroundColor: 'white',
            margin: '8px 5px',
            padding: 16,
            width: matches ? '95%' : '32vw',
            maxHeight: 'auto',
            borderRadius: 10,
            cursor: 'pointer',
            border: '1px solid #f0f0f0',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
          onClick={() => handleNextPage(job)}
        >
          <div style={{ display: 'flex', padding: '4px 10px', alignItems: 'center', borderRadius: 4, width: 'fit-content', marginBottom: 10, background: 'linear-gradient(90deg, #fff3ed 0%, #ffffff 100%)' }}>
            <img src='/spider.png' style={{ width: '16px', height: '16px', marginRight: 6 }} alt="Urgent" />
            <p style={{ fontSize: 13, margin: 0, color: '#e65100', fontWeight: 700 }}>Urgent Hiring</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <img
              src={logoUrl}
              alt={job.companyname || 'Company'}
              onError={(e) => { e.target.src = '/spider.png'; }}
              style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 6, border: '1px solid #eeeeee', padding: 2 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16, flexGrow: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#212529' }}>
                {job.jobtype || job.categoryname || 'Job Title'}
              </div>
              <div style={{ fontSize: 13, color: '#6c757d', fontWeight: 500 }}>{job.companyname}</div>
            </div>
            <KeyboardArrowRightIcon style={{ color: '#0d6efd', width: 24, height: 24 }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12 }}>
            {job.jobtype && job.jobtype.toLowerCase().includes("home") ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon style={{ fontSize: 18, color: '#0d6efd', marginRight: 8 }} />
                <span style={{ fontSize: 14, color: '#495057', fontWeight: 600 }}>Work From Home</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon style={{ fontSize: 18, color: '#6c757d', marginRight: 8 }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {cities.map((c, i) => (
                    <span key={i} style={{ fontSize: 13, color: '#495057', backgroundColor: '#e9ecef', padding: '2px 8px', borderRadius: 4 }}>
                      {c.cityname || c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <PaymentsOutlinedIcon style={{ fontSize: 18, color: '#198754', marginRight: 8 }} />
            <div style={{ fontSize: 14, color: '#212529', fontWeight: 700 }}>
              &#8377; {Number(job.minsalary || 0).toLocaleString()} - &#8377; {Number(job.maxsalary || 0).toLocaleString()} / yr
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 14, gap: 6 }}>
            {job.experience && (
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: '#495057', backgroundColor: '#f8f9fa', padding: '4px 8px', borderRadius: 4, border: '1px solid #e9ecef' }}>
                <SchoolOutlinedIcon style={{ fontSize: 14, marginRight: 4 }} /> {job.experience} Yrs Exp
              </div>
            )}
            {job.schedule && (
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: '#495057', backgroundColor: '#f8f9fa', padding: '4px 8px', borderRadius: 4, border: '1px solid #e9ecef' }}>
                <AccessTimeOutlinedIcon style={{ fontSize: 14, marginRight: 4 }} /> {job.schedule}
              </div>
            )}
            {job.jobtype && (
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: '#495057', backgroundColor: '#f8f9fa', padding: '4px 8px', borderRadius: 4, border: '1px solid #e9ecef' }}>
                <BusinessOutlinedIcon style={{ fontSize: 14, marginRight: 4 }} /> {job.jobtype}
              </div>
            )}
          </div>
        </Paper>
      );
    });
  };

  return (
    <div style={{ height: 'auto', display: 'flex', flexDirection: 'column' }}>
      {showJobsList()}
    </div>
  );
}
