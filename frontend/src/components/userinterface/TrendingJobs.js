import { ArrowForward, WorkOutline } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TrendingJobs({ item = {}, colors = '#b03a84' }) {
  const navigate = useNavigate();
  const title = item.jobtype || 'Featured opportunities';
  const openJobs = item.total_jobs || 'New';
  const handleExplore = () => {
    const params = new URLSearchParams();
    if (item.categoryid) params.set('categoryid', item.categoryid);
    if (item.subcategoryid) params.set('subcategoryid', item.subcategoryid);
    if (item.jobtype && !item.categoryid) params.set('keyword', item.jobtype);
    navigate(`/searchjobs?${params.toString()}`);
  };
  return (
    <Box sx={{ p: 3, minHeight: 220, border: '1px solid #e6ebf2', borderRadius: 4, bgcolor: '#fff', boxShadow: '0 8px 20px rgba(28,39,61,.045)', display: 'flex', flexDirection: 'column', transition: 'transform .2s ease, box-shadow .2s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 16px 30px rgba(28,39,61,.12)' } }}>
      <Box sx={{ width: 48, height: 48, borderRadius: 2.5, display: 'grid', placeItems: 'center', bgcolor: `${colors}16`, color: colors }}><WorkOutline /></Box>
      <Typography sx={{ mt: 2.25, color: '#17233a', fontSize: '1.25rem', fontWeight: 800 }}>{title}</Typography>
      <Typography sx={{ mt: .75, color: '#65748b', fontSize: '.92rem' }}>{openJobs} roles currently listed</Typography>
      <Button onClick={handleExplore} endIcon={<ArrowForward />} sx={{ mt: 'auto', pt: 2.5, px: 0, alignSelf: 'flex-start', textTransform: 'none', color: colors, fontWeight: 800, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>Explore jobs</Button>
    </Box>
  );
}
