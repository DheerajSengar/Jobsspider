import { Box, Typography } from '@mui/material';
import TrendingJobs from './TrendingJobs';

const fallbackJobs = [
  { jobtype: 'Software & IT', total_jobs: 1200, categoryid: 1, subcategoryid: 1 },
  { jobtype: 'Sales & Marketing', total_jobs: 860, categoryid: 2, subcategoryid: 3 },
  { jobtype: 'Finance & Accounting', total_jobs: 540, categoryid: 3, subcategoryid: 5 },
];

export default function TrendingJobsComponent({ items = [], colors = [] }) {
  const palette = colors.length ? colors : ['#9b2e65', '#2563eb', '#0f9d79'];
  const jobs = items.length ? items.slice(0, 6) : fallbackJobs;
  return (
    <Box component="section" sx={{ width: '100%', maxWidth: 1240, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 6, md: 9 } }}>
      <Box sx={{ maxWidth: 650, mb: 3.5 }}>
        <Typography sx={{ color: '#bb2e70', fontSize: '.78rem', fontWeight: 850, letterSpacing: 1.4 }}>EXPLORE OPPORTUNITIES</Typography>
        <Typography sx={{ color: '#17233a', mt: .7, fontWeight: 850, fontSize: { xs: '1.85rem', md: '2.45rem' }, letterSpacing: '-.035em' }}>Roles people are searching for now</Typography>
        <Typography sx={{ color: '#65748b', mt: 1, lineHeight: 1.6 }}>Start with a popular category or refine your search by skills, experience, and location.</Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 2 }}>
        {jobs.map((item, index) => <TrendingJobs key={`${item.jobtype}-${index}`} item={item} index={index} colors={palette[index % palette.length]} />)}
      </Box>
    </Box>
  );
}
