import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link, Stack, Typography } from '@mui/material';

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //

const Footer = () => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
    <Typography variant="caption">&copy; PBT File Manager</Typography>
    <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
      <Link component={RouterLink} to="file-manager" target="_self" variant="caption" color="textPrimary">
        Home
      </Link>
      <Link component={RouterLink} to="#" target="_self" variant="caption" color="textPrimary">
        Ajuda
      </Link>
    </Stack>
  </Stack>
);

export default Footer;
