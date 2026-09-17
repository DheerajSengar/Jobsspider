import { useState } from "react";
import { Button, Divider, Paper, Typography } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { serverURL, postData } from "../../services/FetchNodeServices";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PopupComponent from "../userlogin/PopupComponent";

export default function ShowJobsCardDetails({ data = {} }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popOpen, setPopOpen] = useState(false);

  const handleApply = async () => {
    if (!user) {
      setPopOpen(true);
      return;
    }

    if (!data.jobid) {
      Swal.fire('Error', 'Invalid Job selection.', 'error');
      return;
    }

    setLoading(true);
    const res = await postData('userinterface/apply_job', {
      jobid: data.jobid,
      user_email: user.emailaddress || user.emailMobile,
      user_phone: user.mobileno || ''
    });
    setLoading(false);

    if (res.status) {
      setApplied(true);
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        text: 'Your application has been successfully sent to the employer.',
        confirmButtonColor: '#0d6efd'
      });
    } else {
      Swal.fire('Notice', res.message || 'Failed to submit application.', 'info');
    }
  };

  const handleSaveJob = async () => {
    if (!user) {
      setPopOpen(true);
      return;
    }

    const res = await postData('userinterface/save_job', { jobid: data.jobid });
    if (res.status) {
      Swal.fire({
        icon: 'success',
        title: 'Job Saved!',
        text: 'Job has been added to your saved bookmarks.',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      Swal.fire('Notice', res.message || 'Job already saved.', 'info');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${data.jobtype || 'Job'} at ${data.companyname}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire('Copied!', 'Job link copied to clipboard.', 'success');
    }
  };

  const logoUrl = (data.companylogo || data.logo || '').startsWith('http')
    ? (data.companylogo || data.logo)
    : `${serverURL}/images/${data.logo || 'spider.png'}`;

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Paper
        elevation={2}
        style={{
          backgroundColor: '#ffffff',
          padding: 24,
          width: matches ? '100%' : '50vw',
          borderRadius: 12,
          border: '1px solid #e0e0e0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <img
            src={logoUrl}
            alt={data.companyname}
            onError={(e) => { e.target.src = '/spider.png'; }}
            style={{ width: 50, height: 50, objectFit: 'contain', borderRadius: 8, marginRight: 16, border: '1px solid #eeeeee' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" style={{ fontWeight: 800, color: '#212529' }}>
              {data.jobtype || `${data.categoryname || ''} ${data.subcategoryname || ''}`}
            </Typography>
            <Typography variant="body2" style={{ color: '#6c757d', fontWeight: 600 }}>
              {data.companyname}
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, margin: '16px 0', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#e9ecef', padding: '6px 12px', borderRadius: 6, fontSize: 14, color: '#495057' }}>
            📍 Location: {typeof data.worklocationcity === 'string' ? data.worklocationcity : 'As Listed'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#d1e7dd', padding: '6px 12px', borderRadius: 6, fontSize: 14, color: '#0f5132', fontWeight: 700 }}>
            💰 &#8377;{Number(data.minsalary || 0).toLocaleString()} - &#8377;{Number(data.maxsalary || 0).toLocaleString()} / yr
          </div>
        </div>

        <Paper
          elevation={0}
          style={{
            padding: 16,
            backgroundColor: '#f8f9fa',
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'space-around',
            margin: '16px 0',
            border: '1px solid #e9ecef'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Typography variant="caption" style={{ color: '#6c757d', display: 'block' }}>Experience</Typography>
            <Typography variant="subtitle2" style={{ fontWeight: 700 }}>{data.experience || 'Not Specified'}</Typography>
          </div>
          <Divider orientation="vertical" flexItem />
          <div style={{ textAlign: 'center' }}>
            <Typography variant="caption" style={{ color: '#6c757d', display: 'block' }}>Schedule</Typography>
            <Typography variant="subtitle2" style={{ fontWeight: 700 }}>{data.schedule || 'Full-time'}</Typography>
          </div>
          <Divider orientation="vertical" flexItem />
          <div style={{ textAlign: 'center' }}>
            <Typography variant="caption" style={{ color: '#6c757d', display: 'block' }}>Posted Date</Typography>
            <Typography variant="subtitle2" style={{ fontWeight: 700 }}>{data.postdate ? new Date(data.postdate).toLocaleDateString() : 'Recent'}</Typography>
          </div>
        </Paper>

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <Button
            variant="contained"
            disabled={loading || applied}
            onClick={handleApply}
            style={{
              flex: 2,
              height: 48,
              backgroundColor: applied ? '#198754' : '#0d6efd',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 800,
              fontSize: '1rem',
              borderRadius: 8
            }}
            startIcon={applied ? <CheckCircleIcon /> : null}
          >
            {applied ? 'Applied' : loading ? 'Submitting...' : 'Apply For Job'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleSaveJob}
            style={{ height: 48, borderColor: '#6c757d', color: '#495057', textTransform: 'none', fontWeight: 700, borderRadius: 8 }}
            startIcon={<BookmarkBorderIcon />}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={handleShare}
            style={{ height: 48, borderColor: '#198754', color: '#198754', textTransform: 'none', fontWeight: 700, borderRadius: 8 }}
            startIcon={<ShareIcon />}
          >
            Share
          </Button>
        </div>
      </Paper>

      <PopupComponent open={popOpen} setClose={setPopOpen} />
    </div>
  );
}