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
          padding: 60,
          textAlign: 'center',
          width: matches ? '95%' : '32vw',
          margin: 10,
          borderRadius: 16,
          backgroundColor: '#ffffff',
          border: '2px dashed #e2e8f0',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)'
        }}
      >
        <WorkOffOutlinedIcon style={{ fontSize: 64, color: '#cbd5e0', marginBottom: 16 }} />
        <Typography variant="h5" style={{ fontWeight: 800, color: '#2d3748', marginBottom: 8 }}>
          No jobs found matching your filters
        </Typography>
        <Typography variant="body1" style={{ color: '#718096', marginTop: 12, lineHeight: 1.6 }}>
          Try adjusting your search criteria, experience level, or date posted options.
        </Typography>
        <Typography variant="body2" style={{ color: '#a0aec0', marginTop: 16, fontSize: 14 }}>
          💡 Tip: Try broader search terms or reduce your filter requirements
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
          elevation={2}
          style={{
            backgroundColor: 'white',
            margin: '12px 5px',
            padding: 20,
            width: matches ? '95%' : '32vw',
            maxHeight: 'auto',
            borderRadius: 12,
            cursor: 'pointer',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}
          onClick={() => handleNextPage(job)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
          }}
        >
          <div style={{ display: 'flex', padding: '6px 12px', alignItems: 'center', borderRadius: 20, width: 'fit-content', marginBottom: 12, background: 'linear-gradient(135deg, #fff3ed 0%, #ffe8d6 100%)', border: '1px solid #ffd8b8' }}>
            <img src='/spider.png' style={{ width: '18px', height: '18px', marginRight: 8 }} alt="Urgent" />
            <p style={{ fontSize: 12, margin: 0, color: '#e65100', fontWeight: 800, letterSpacing: 0.5 }}>URGENT HIRING</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <img
              src={logoUrl}
              alt={job.companyname || 'Company'}
              onError={(e) => { e.target.src = '/spider.png'; }}
              style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: 10, border: '2px solid #f0f0f0', padding: 4, backgroundColor: '#fafafa' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16, flexGrow: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#1a202c', lineHeight: 1.3 }}>
                {job.jobtype || job.categoryname || 'Job Title'}
              </div>
              <div style={{ fontSize: 14, color: '#718096', fontWeight: 600, marginTop: 4 }}>{job.companyname}</div>
            </div>
            <KeyboardArrowRightIcon style={{ color: '#667eea', width: 28, height: 28 }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
            {job.jobtype && job.jobtype.toLowerCase().includes("home") ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon style={{ fontSize: 20, color: '#667eea', marginRight: 8 }} />
                <span style={{ fontSize: 14, color: '#4a5568', fontWeight: 600 }}>Work From Home</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon style={{ fontSize: 20, color: '#718096', marginRight: 8 }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {cities.map((c, i) => (
                    <span key={i} style={{ fontSize: 13, color: '#4a5568', backgroundColor: '#edf2f7', padding: '4px 10px', borderRadius: 6, fontWeight: 500 }}>
                      {c.cityname || c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 12, padding: '10px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
            <PaymentsOutlinedIcon style={{ fontSize: 20, color: '#48bb78', marginRight: 8 }} />
            <div style={{ fontSize: 15, color: '#1a202c', fontWeight: 800 }}>
              &#8377; {Number(job.minsalary || 0).toLocaleString()} - &#8377; {Number(job.maxsalary || 0).toLocaleString()} / yr
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 14, gap: 8 }}>
            {job.experience && (
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: '#4a5568', backgroundColor: '#f7fafc', padding: '6px 10px', borderRadius: 6, border: '1px solid #e2e8f0', fontWeight: 600 }}>
                <SchoolOutlinedIcon style={{ fontSize: 14, marginRight: 6 }} /> {job.experience} Yrs Exp
              </div>
            )}
            {job.schedule && (
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: '#4a5568', backgroundColor: '#f7fafc', padding: '6px 10px', borderRadius: 6, border: '1px solid #e2e8f0', fontWeight: 600 }}>
                <AccessTimeOutlinedIcon style={{ fontSize: 14, marginRight: 6 }} /> {job.schedule}
              </div>
            )}
            {job.jobtype && (
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: '#4a5568', backgroundColor: '#f7fafc', padding: '6px 10px', borderRadius: 6, border: '1px solid #e2e8f0', fontWeight: 600 }}>
                <BusinessOutlinedIcon style={{ fontSize: 14, marginRight: 6 }} /> {job.jobtype}
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
