import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { __VERSION__ } from 'config';

const Footer = () => {
  return (
    <FooterRoot>
      <Box>
        <Typography variant="subtitle2">
          Origin portal v{__VERSION__}
        </Typography>
      </Box>
      <Typography variant="subtitle2">Handcrafted by Đức Lê.</Typography>
    </FooterRoot>
  );
};

const FooterRoot = styled('footer')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default Footer;
