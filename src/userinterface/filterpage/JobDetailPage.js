import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Button, Divider, Typography, Chip, Skeleton, IconButton } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import parse from 'html-react-parser';
import { serverURL, getData, postData } from "../../services/FetchNodeServices";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PopupComponent from "../userlogin/PopupComponent";

export default function JobDetailPage() {
  const { jobid } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useSelector(state => state.user);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [saved, setSaved] = useState(false);
  const [popOpen, setPopOpen] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobDetails();
    fetchRelatedJobs();
  }, [jobid]);

  const fetchJobDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getData(`userinterface/job_details/${jobid}`);
      if (res.status && res.data) {
        setJob(res.data);
      } else {
        setError(res.message || 'Job not found');
      }
    } catch (err) {
      setError('Failed to load job details. Please try again.');
    }
    setLoading(false);
  };

  const fetchRelatedJobs = async () => {
    try {
      const res = await getData(`userinterface/related_jobs/${jobid}`);
      if (res.status && res.data) {
        setRelatedJobs(res.data);
      }
    } catch (err) {
      // Silently fail for related jobs
    }
  };

  const handleApply = async () => {
    if (!user) {
      setPopOpen(true);
      return;
    }
    setApplying(true);
    const res = await postData('userinterface/apply_job', {
      jobid: job.jobid,
      user_email: user.emailaddress || user.emailMobile,
      user_phone: user.mobileno || ''
    });
    setApplying(false);
    if (res.status) {
      setApplied(true);
      Swal.fire({ icon: 'success', title: 'Application Submitted!', text: 'Your application has been successfully sent to the employer.', confirmButtonColor: '#2563eb' });
    } else {
      Swal.fire('Notice', res.message || 'Failed to submit application.', 'info');
    }
  };

  const handleSaveJob = async () => {
    if (!user) {
      setPopOpen(true);
      return;
    }
    const res = await postData('userinterface/save_job', { jobid: job.jobid });
    if (res.status) {
      setSaved(true);
      Swal.fire({ icon: 'success', title: 'Job Saved!', text: 'Job has been added to your bookmarks.', timer: 1500, showConfirmButton: false });
    } else {
      Swal.fire('Notice', res.message || 'Job already saved.', 'info');
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({ title: `${job.jobtype || 'Job'} at ${job.companyname}`, url: shareUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      Swal.fire('Copied!', 'Job link copied to clipboard.', 'success');
    }
  };

  const safeParse = (str) => {
    if (!str) return [];
    if (Array.isArray(str)) return str;
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      return str.split(',').map(s => s.trim()).filter(Boolean);
    }
  };

  const safeHtmlParse = (html) => {
    if (!html || html === 'undefined' || html === 'null') return null;
    try {
      return parse(String(html));
    } catch (e) {
      return html;
    }
  };

  const getLogoUrl = (logo) => {
    if (!logo) return '/spider.png';
    if (logo.startsWith('http')) return logo;
    return `${serverURL}/images/${logo}`;
  };

  const formatSalary = (val) => {
    const num = Number(val || 0);
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toLocaleString('en-IN');
  };

  const getTimeAgo = (dateStr) => {
    if (!dateStr) return 'Recently';
    const diff = Math.floor((new Date() - new Date(dateStr)) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} week${Math.floor(diff / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diff / 30)} month${Math.floor(diff / 30) > 1 ? 's' : ''} ago`;
  };

  // ---------- LOADING STATE ----------
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: matches ? 16 : 40, backgroundColor: '#f4f6f8' }}>
          <div style={{ width: matches ? '100%' : 720, maxWidth: '100%' }}>
            <Skeleton variant="rounded" height={200} style={{ marginBottom: 20, borderRadius: 16 }} />
            <Skeleton variant="rounded" height={300} style={{ marginBottom: 20, borderRadius: 16 }} />
            <Skeleton variant="rounded" height={200} style={{ borderRadius: 16 }} />
          </div>
        </div>
      </div>
    );
  }

  // ---------- ERROR STATE ----------
  if (error || !job) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8', padding: 40 }}>
          <Paper elevation={0} style={{ padding: 48, textAlign: 'center', borderRadius: 16, border: '1px solid #e5e7eb', maxWidth: 480 }}>
            <WorkOutlineIcon style={{ fontSize: 64, color: '#9ca3af', marginBottom: 16 }} />
            <Typography variant="h5" style={{ fontWeight: 700, color: '#1f2937', marginBottom: 8 }}>
              {error || 'Job Not Found'}
            </Typography>
            <Typography variant="body1" style={{ color: '#6b7280', marginBottom: 24 }}>
              The job listing may have been removed or expired.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/searchjobs')}
              style={{ backgroundColor: '#2563eb', textTransform: 'none', fontWeight: 700, borderRadius: 10, padding: '10px 32px' }}
            >
              Browse All Jobs
            </Button>
          </Paper>
        </div>
        <Footer />
      </div>
    );
  }

  const cities = safeParse(job.worklocationcity);
  const qualifications = safeParse(job.educationqualification);
  const skills = safeParse(job.skills);
  const logoUrl = getLogoUrl(job.companylogo || job.logo);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <Header />

      {/* Back Navigation Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '8px 0',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate(-1)} style={{ marginRight: 8 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body2" style={{ color: '#6b7280' }}>
            Back to search results
          </Typography>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        maxWidth: 1100,
        margin: '0 auto',
        padding: matches ? '16px 12px' : '32px 20px',
        width: '100%',
        display: 'flex',
        flexDirection: matches ? 'column' : 'row',
        gap: 24
      }}>
        {/* Left: Main Content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* ========== JOB HEADER CARD ========== */}
          <Paper elevation={0} style={{
            padding: matches ? 20 : 28,
            borderRadius: 16,
            border: '1px solid #e5e7eb',
            marginBottom: 20,
            backgroundColor: '#ffffff'
          }}>
            {/* Company Logo + Title */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
              <img
                src={logoUrl}
                alt={job.companyname}
                onError={(e) => { e.target.src = '/spider.png'; }}
                style={{
                  width: 56, height: 56, objectFit: 'contain',
                  borderRadius: 12, border: '1px solid #e5e7eb', padding: 4,
                  backgroundColor: '#fff', flexShrink: 0
                }}
              />
              <div style={{ flex: 1 }}>
                <Typography variant="h5" style={{ fontWeight: 800, color: '#111827', lineHeight: 1.3, fontSize: matches ? 20 : 24 }}>
                  {job.jobtype || `${job.categoryname || ''} ${job.subcategoryname || ''}`}
                </Typography>
                <Typography variant="body1" style={{ color: '#4b5563', fontWeight: 600, marginTop: 4 }}>
                  {job.companyname}
                </Typography>
              </div>
            </div>

            {/* Location + Salary Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                backgroundColor: '#eff6ff', padding: '8px 14px', borderRadius: 8,
                border: '1px solid #dbeafe'
              }}>
                <LocationOnIcon style={{ fontSize: 18, color: '#2563eb' }} />
                <span style={{ fontSize: 14, color: '#1e40af', fontWeight: 600 }}>
                  {cities.length > 0
                    ? cities.map(c => typeof c === 'object' ? c.cityname : c).join(', ')
                    : (job.cityname || 'Location not specified')}
                </span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                backgroundColor: '#ecfdf5', padding: '8px 14px', borderRadius: 8,
                border: '1px solid #d1fae5'
              }}>
                <PaymentsOutlinedIcon style={{ fontSize: 18, color: '#059669' }} />
                <span style={{ fontSize: 14, color: '#065f46', fontWeight: 700 }}>
                  ₹{formatSalary(job.minsalary)} - ₹{formatSalary(job.maxsalary)} / year
                </span>
              </div>
              {job.postdate && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  backgroundColor: '#fef3c7', padding: '8px 14px', borderRadius: 8,
                  border: '1px solid #fde68a'
                }}>
                  <CalendarTodayIcon style={{ fontSize: 16, color: '#d97706' }} />
                  <span style={{ fontSize: 14, color: '#92400e', fontWeight: 600 }}>
                    Posted {getTimeAgo(job.postdate)}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Info Bar */}
            <Paper elevation={0} style={{
              padding: 16, backgroundColor: '#f9fafb', borderRadius: 12,
              display: 'flex', justifyContent: 'space-around', alignItems: 'center',
              border: '1px solid #f3f4f6', marginBottom: 20, flexWrap: 'wrap', gap: 8
            }}>
              <div style={{ textAlign: 'center', padding: '4px 12px' }}>
                <Typography variant="caption" style={{ color: '#6b7280', display: 'block', fontWeight: 600, textTransform: 'uppercase', fontSize: 11 }}>Experience</Typography>
                <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#111827' }}>{job.experience || 'Fresher'}</Typography>
              </div>
              <Divider orientation="vertical" flexItem />
              <div style={{ textAlign: 'center', padding: '4px 12px' }}>
                <Typography variant="caption" style={{ color: '#6b7280', display: 'block', fontWeight: 600, textTransform: 'uppercase', fontSize: 11 }}>Schedule</Typography>
                <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#111827' }}>{job.schedule || 'Full-time'}</Typography>
              </div>
              <Divider orientation="vertical" flexItem />
              <div style={{ textAlign: 'center', padding: '4px 12px' }}>
                <Typography variant="caption" style={{ color: '#6b7280', display: 'block', fontWeight: 600, textTransform: 'uppercase', fontSize: 11 }}>Job Type</Typography>
                <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#111827' }}>{job.jobtype || 'Not Specified'}</Typography>
              </div>
              {job.applicationdeadline && (
                <>
                  <Divider orientation="vertical" flexItem />
                  <div style={{ textAlign: 'center', padding: '4px 12px' }}>
                    <Typography variant="caption" style={{ color: '#6b7280', display: 'block', fontWeight: 600, textTransform: 'uppercase', fontSize: 11 }}>Deadline</Typography>
                    <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#dc2626' }}>{new Date(job.applicationdeadline).toLocaleDateString('en-IN')}</Typography>
                  </div>
                </>
              )}
            </Paper>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                disabled={applying || applied}
                onClick={handleApply}
                startIcon={applied ? <CheckCircleIcon /> : null}
                style={{
                  flex: 2, minWidth: 180, height: 48,
                  backgroundColor: applied ? '#059669' : '#2563eb',
                  color: '#fff', textTransform: 'none', fontWeight: 800,
                  fontSize: '1rem', borderRadius: 10,
                  boxShadow: applied ? 'none' : '0 4px 14px rgba(37,99,235,0.3)'
                }}
              >
                {applied ? 'Applied ✓' : applying ? 'Submitting...' : 'Apply Now'}
              </Button>
              <Button
                variant="outlined"
                onClick={handleSaveJob}
                startIcon={saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                style={{
                  height: 48, borderColor: saved ? '#2563eb' : '#d1d5db',
                  color: saved ? '#2563eb' : '#4b5563',
                  textTransform: 'none', fontWeight: 700, borderRadius: 10,
                  backgroundColor: saved ? '#eff6ff' : 'transparent'
                }}
              >
                {saved ? 'Saved' : 'Save'}
              </Button>
              <Button
                variant="outlined"
                onClick={handleShare}
                startIcon={<ShareIcon />}
                style={{
                  height: 48, borderColor: '#d1d5db', color: '#4b5563',
                  textTransform: 'none', fontWeight: 700, borderRadius: 10
                }}
              >
                Share
              </Button>
            </div>
          </Paper>

          {/* ========== JOB HIGHLIGHTS ========== */}
          <Paper elevation={0} style={{
            padding: matches ? 20 : 28,
            borderRadius: 16,
            border: '1px solid #e5e7eb',
            marginBottom: 20,
            backgroundColor: '#ffffff'
          }}>
            <Typography variant="h6" style={{ fontWeight: 800, color: '#111827', marginBottom: 16 }}>
              ⚡ Job Highlights
            </Typography>
            <div style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
              borderRadius: 12, padding: 16, border: '1px solid #dbeafe'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>🔥</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>Urgently Hiring</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>👥</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>Multiple Openings</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>⚡</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>Fast HR Reply</span>
                </div>
              </div>
            </div>
          </Paper>

          {/* ========== JOB DESCRIPTION ========== */}
          {job.jobdeatails && (
            <Paper elevation={0} style={{
              padding: matches ? 20 : 28,
              borderRadius: 16,
              border: '1px solid #e5e7eb',
              marginBottom: 20,
              backgroundColor: '#ffffff'
            }}>
              <Typography variant="h6" style={{ fontWeight: 800, color: '#111827', marginBottom: 16 }}>
                📋 Job Description
              </Typography>
              <div style={{ fontSize: 15, lineHeight: 1.8, color: '#374151' }}>
                {safeHtmlParse(job.jobdeatails)}
              </div>
            </Paper>
          )}

          {/* ========== SKILLS & QUALIFICATIONS ========== */}
          {(skills.length > 0 || qualifications.length > 0) && (
            <Paper elevation={0} style={{
              padding: matches ? 20 : 28,
              borderRadius: 16,
              border: '1px solid #e5e7eb',
              marginBottom: 20,
              backgroundColor: '#ffffff'
            }}>
              {skills.length > 0 && (
                <>
                  <Typography variant="h6" style={{ fontWeight: 800, color: '#111827', marginBottom: 12 }}>
                    🛠️ Required Skills
                  </Typography>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: qualifications.length > 0 ? 24 : 0 }}>
                    {skills.map((skill, idx) => (
                      <Chip
                        key={idx}
                        label={typeof skill === 'object' ? (skill.title || skill.skills || skill.name) : skill}
                        style={{
                          backgroundColor: '#eff6ff',
                          color: '#1e40af',
                          fontWeight: 600,
                          border: '1px solid #bfdbfe',
                          fontSize: 13
                        }}
                      />
                    ))}
                  </div>
                </>
              )}

              {qualifications.length > 0 && (
                <>
                  <Typography variant="h6" style={{ fontWeight: 800, color: '#111827', marginBottom: 12 }}>
                    🎓 Education & Qualifications
                  </Typography>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {qualifications.map((q, idx) => (
                      <Chip
                        key={idx}
                        label={typeof q === 'object' ? (q.title || q.name) : q}
                        style={{
                          backgroundColor: '#fef3c7',
                          color: '#92400e',
                          fontWeight: 600,
                          border: '1px solid #fde68a',
                          fontSize: 13
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </Paper>
          )}

          {/* ========== JOB ROLE & DETAILS ========== */}
          <Paper elevation={0} style={{
            padding: matches ? 20 : 28,
            borderRadius: 16,
            border: '1px solid #e5e7eb',
            marginBottom: 20,
            backgroundColor: '#ffffff'
          }}>
            <Typography variant="h6" style={{ fontWeight: 800, color: '#111827', marginBottom: 16 }}>
              💼 Job Role Details
            </Typography>
            <div style={{ display: 'grid', gridTemplateColumns: matches ? '1fr' : '1fr 1fr', gap: 16 }}>
              <DetailItem icon="🏢" label="Department" value={job.categoryname} />
              <DetailItem icon="📂" label="Role / Category" value={job.subcategoryname} />
              <DetailItem icon="💻" label="Employment Type" value={job.jobtype} />
              <DetailItem icon="🕐" label="Shift / Schedule" value={job.schedule} />
              <DetailItem icon="📊" label="Experience Required" value={job.experience ? `${job.experience} Years` : 'Fresher'} />
              {job.contactperson && <DetailItem icon="👤" label="Contact Person" value={job.contactperson} />}
            </div>
          </Paper>

          {/* ========== BENEFITS & PERKS ========== */}
          {(job.benifits || job.supplementalpay) && (
            <Paper elevation={0} style={{
              padding: matches ? 20 : 28,
              borderRadius: 16,
              border: '1px solid #e5e7eb',
              marginBottom: 20,
              backgroundColor: '#ffffff'
            }}>
              {job.benifits && (
                <>
                  <Typography variant="h6" style={{ fontWeight: 800, color: '#111827', marginBottom: 12 }}>
                    🎁 Benefits
                  </Typography>
                  <div style={{ fontSize: 15, lineHeight: 1.8, color: '#374151', marginBottom: job.supplementalpay ? 20 : 0 }}>
                    {safeHtmlParse(job.benifits)}
                  </div>
                </>
              )}
              {job.supplementalpay && (
                <>
                  <Typography variant="h6" style={{ fontWeight: 800, color: '#111827', marginBottom: 12 }}>
                    💰 Supplemental Pay & Perks
                  </Typography>
                  <div style={{ fontSize: 15, lineHeight: 1.8, color: '#374151' }}>
                    {safeHtmlParse(job.supplementalpay)}
                  </div>
                </>
              )}
            </Paper>
          )}

          {/* ========== WORK LOCATION ========== */}
          {cities.length > 0 && (
            <Paper elevation={0} style={{
              padding: matches ? 20 : 28,
              borderRadius: 16,
              border: '1px solid #e5e7eb',
              marginBottom: 20,
              backgroundColor: '#ffffff'
            }}>
              <Typography variant="h6" style={{ fontWeight: 800, color: '#111827', marginBottom: 12 }}>
                📍 Work Locations
              </Typography>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cities.map((city, idx) => (
                  <Chip
                    key={idx}
                    icon={<LocationOnIcon style={{ fontSize: 16 }} />}
                    label={typeof city === 'object' ? city.cityname : city}
                    style={{
                      backgroundColor: '#f0fdf4',
                      color: '#166534',
                      fontWeight: 600,
                      border: '1px solid #bbf7d0',
                      fontSize: 13
                    }}
                  />
                ))}
              </div>
            </Paper>
          )}

          {/* ========== ABOUT COMPANY ========== */}
          <Paper elevation={0} style={{
            padding: matches ? 20 : 28,
            borderRadius: 16,
            border: '1px solid #e5e7eb',
            marginBottom: 20,
            backgroundColor: '#ffffff'
          }}>
            <Typography variant="h6" style={{ fontWeight: 800, color: '#111827', marginBottom: 16 }}>
              🏢 About {job.companyname}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <img
                src={logoUrl}
                alt={job.companyname}
                onError={(e) => { e.target.src = '/spider.png'; }}
                style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 10, border: '1px solid #e5e7eb', padding: 4 }}
              />
              <div>
                <Typography variant="subtitle1" style={{ fontWeight: 700, color: '#111827' }}>{job.companyname}</Typography>
                {job.companyaddress && (
                  <Typography variant="body2" style={{ color: '#6b7280' }}>
                    {job.companyaddress}{job.cityname ? `, ${job.cityname}` : ''}{job.statename ? `, ${job.statename}` : ''}
                  </Typography>
                )}
              </div>
            </div>
            {job.aboutcompany && (
              <div style={{ fontSize: 15, lineHeight: 1.8, color: '#374151' }}>
                {safeHtmlParse(job.aboutcompany)}
              </div>
            )}
            <div style={{ marginTop: 12, padding: '12px 16px', backgroundColor: '#f9fafb', borderRadius: 10, border: '1px solid #f3f4f6' }}>
              <Typography variant="body2" style={{ color: '#6b7280' }}>
                Job posted by <strong style={{ color: '#1f2937' }}>JobsSpider Management Services</strong>
              </Typography>
            </div>
          </Paper>

        </div>

        {/* ========== RIGHT SIDEBAR ========== */}
        {!matches && (
          <div style={{ width: 320, flexShrink: 0 }}>
            {/* Quick Apply Card */}
            <Paper elevation={0} style={{
              padding: 24, borderRadius: 16, border: '1px solid #e5e7eb',
              marginBottom: 20, backgroundColor: '#ffffff', position: 'sticky', top: 80
            }}>
              <Typography variant="subtitle1" style={{ fontWeight: 700, color: '#111827', marginBottom: 12 }}>
                Quick Apply
              </Typography>
              <Button
                variant="contained"
                fullWidth
                disabled={applying || applied}
                onClick={handleApply}
                startIcon={applied ? <CheckCircleIcon /> : null}
                style={{
                  height: 48, backgroundColor: applied ? '#059669' : '#2563eb',
                  color: '#fff', textTransform: 'none', fontWeight: 800,
                  borderRadius: 10, marginBottom: 12,
                  boxShadow: applied ? 'none' : '0 4px 14px rgba(37,99,235,0.3)'
                }}
              >
                {applied ? 'Applied ✓' : applying ? 'Submitting...' : 'Apply Now'}
              </Button>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="outlined" fullWidth onClick={handleSaveJob}
                  startIcon={saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  style={{ textTransform: 'none', fontWeight: 600, borderRadius: 10, borderColor: '#d1d5db', color: '#4b5563', fontSize: 13 }}>
                  {saved ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outlined" fullWidth onClick={handleShare}
                  startIcon={<ShareIcon />}
                  style={{ textTransform: 'none', fontWeight: 600, borderRadius: 10, borderColor: '#d1d5db', color: '#4b5563', fontSize: 13 }}>
                  Share
                </Button>
              </div>
            </Paper>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <Paper elevation={0} style={{
                padding: 20, borderRadius: 16, border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff'
              }}>
                <Typography variant="subtitle1" style={{ fontWeight: 700, color: '#111827', marginBottom: 12 }}>
                  Similar Jobs
                </Typography>
                {relatedJobs.map((rj, idx) => (
                  <div
                    key={rj.jobid || idx}
                    onClick={() => navigate(`/job/${rj.jobid}`)}
                    style={{
                      padding: 12, borderRadius: 10, border: '1px solid #f3f4f6',
                      marginBottom: 8, cursor: 'pointer', transition: 'all 0.15s ease',
                      backgroundColor: '#fafafa'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#eff6ff'; e.currentTarget.style.borderColor = '#bfdbfe'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fafafa'; e.currentTarget.style.borderColor = '#f3f4f6'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img
                        src={getLogoUrl(rj.companylogo)}
                        alt={rj.companyname}
                        onError={(e) => { e.target.src = '/spider.png'; }}
                        style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6, border: '1px solid #e5e7eb' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>
                          {rj.jobtype || rj.categoryname}
                        </div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{rj.companyname}</div>
                      </div>
                      <KeyboardArrowRightIcon style={{ color: '#9ca3af', fontSize: 20 }} />
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, color: '#059669', fontWeight: 600 }}>
                        ₹{formatSalary(rj.minsalary)}-{formatSalary(rj.maxsalary)}
                      </span>
                      {rj.experience && <span style={{ fontSize: 12, color: '#6b7280' }}>• {rj.experience} yrs</span>}
                    </div>
                  </div>
                ))}
              </Paper>
            )}
          </div>
        )}
      </div>

      {/* Mobile Related Jobs */}
      {matches && relatedJobs.length > 0 && (
        <div style={{ padding: '0 12px 20px' }}>
          <Paper elevation={0} style={{ padding: 20, borderRadius: 16, border: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
            <Typography variant="subtitle1" style={{ fontWeight: 700, color: '#111827', marginBottom: 12 }}>
              Similar Jobs
            </Typography>
            {relatedJobs.slice(0, 4).map((rj, idx) => (
              <div
                key={rj.jobid || idx}
                onClick={() => navigate(`/job/${rj.jobid}`)}
                style={{
                  padding: 12, borderRadius: 10, border: '1px solid #f3f4f6',
                  marginBottom: 8, cursor: 'pointer', backgroundColor: '#fafafa'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img
                    src={getLogoUrl(rj.companylogo)}
                    alt={rj.companyname}
                    onError={(e) => { e.target.src = '/spider.png'; }}
                    style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6, border: '1px solid #e5e7eb' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{rj.jobtype || rj.categoryname}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{rj.companyname}</div>
                  </div>
                  <KeyboardArrowRightIcon style={{ color: '#9ca3af', fontSize: 20 }} />
                </div>
              </div>
            ))}
          </Paper>
        </div>
      )}

      {/* Mobile Bottom Fixed Apply Bar */}
      {matches && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb',
          padding: '10px 16px', display: 'flex', gap: 10, zIndex: 100,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)'
        }}>
          <Button
            variant="contained" fullWidth
            disabled={applying || applied}
            onClick={handleApply}
            style={{
              height: 48, backgroundColor: applied ? '#059669' : '#2563eb',
              color: '#fff', textTransform: 'none', fontWeight: 800,
              borderRadius: 10
            }}
          >
            {applied ? 'Applied ✓' : applying ? 'Submitting...' : 'Apply Now'}
          </Button>
          <IconButton onClick={handleSaveJob} style={{ border: '1px solid #d1d5db', borderRadius: 10 }}>
            {saved ? <BookmarkIcon style={{ color: '#2563eb' }} /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      )}

      <Footer />
      <PopupComponent open={popOpen} setClose={setPopOpen} />
    </div>
  );
}

// Reusable detail item sub-component
function DetailItem({ icon, label, value }) {
  if (!value) return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      padding: 12, backgroundColor: '#f9fafb', borderRadius: 10,
      border: '1px solid #f3f4f6'
    }}>
      <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 15, color: '#111827', fontWeight: 600 }}>{value}</div>
      </div>
    </div>
  );
}
