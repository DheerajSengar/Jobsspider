import { Box, Chip, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchBarComponent from './SearchBarComponent';
import SearchBarMob from './SearchBarMob';

export default function SearchJobs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box component="section" sx={{ overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderBottom: '1px solid #e8edf5' }}>
      <Box sx={{ position: 'absolute', top: -150, right: -100, width: 400, height: 400, borderRadius: '50%', bgcolor: 'rgba(255, 255, 255, 0.1)', filter: 'blur(60px)' }} />
      <Box sx={{ position: 'absolute', bottom: -100, left: '10%', width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255, 255, 255, 0.08)', filter: 'blur(50px)' }} />
      <Box sx={{ maxWidth: 1240, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 6, md: 10 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr .8fr' }, gap: { xs: 6, md: 8 }, alignItems: 'center' }}>
          <Box>
            <Chip 
              label="INDIA'S CAREER MARKETPLACE" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                color: '#ffffff', 
                fontWeight: 800, 
                letterSpacing: 1.5, 
                mb: 3,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }} 
            />
            <Typography sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-.04em', color: '#ffffff', maxWidth: 750 }}>
              Find work that moves <Box component="span" sx={{ color: '#ffd700' }}>you forward.</Box>
            </Typography>
            <Typography sx={{ mt: 3, maxWidth: 600, fontSize: { xs: '1.1rem', md: '1.2rem' }, lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 400 }}>
              Explore verified roles, build your profile, and connect with employers who are looking for your skills.
            </Typography>
            <Box sx={{ mt: 4, maxWidth: 850 }}>{isMobile ? <SearchBarMob /> : <SearchBarComponent />}</Box>
            <Stack direction="row" spacing={{ xs: 3, sm: 6 }} sx={{ mt: 4, flexWrap: 'wrap', rowGap: 2 }}>
              {[['50L+', 'career opportunities'], ['1K+', 'employers hiring'], ['24/7', 'job discovery']].map(([value, label]) => (
                <Box key={label} sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 900, fontSize: '1.8rem', color: '#ffffff', lineHeight: 1 }}>{value}</Typography>
                  <Typography sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
          {!isMobile && <Box sx={{ position: 'relative', minHeight: 420, display: 'grid', placeItems: 'center' }}>
            <Box sx={{ position: 'absolute', width: 380, height: 380, borderRadius: 20, transform: 'rotate(-6deg)', bgcolor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(20px)', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)' }} />
            <Box sx={{ position: 'relative', width: 400, p: 4, borderRadius: 16, bgcolor: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)' }}>
              <Typography sx={{ fontSize: '.85rem', fontWeight: 900, color: '#667eea', letterSpacing: 1.5, textTransform: 'uppercase' }}>Your Next Move</Typography>
              <Typography sx={{ mt: 2, fontSize: '1.6rem', fontWeight: 800, color: '#1a202c', lineHeight: 1.3 }}>A simpler way to find the right role.</Typography>
              <Box component="img" src="/job-portal.png" alt="Job discovery dashboard" sx={{ display: 'block', width: '90%', mx: 'auto', mt: 3, objectFit: 'contain', borderRadius: 8 }} />
            </Box>
          </Box>}
        </Box>
      </Box>
    </Box>
  );
}
