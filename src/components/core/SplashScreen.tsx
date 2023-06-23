import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { __TITLE__ } from 'config';

const SplashScreen = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        bgcolor: 'background.paper',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed',
        zIndex: 'modal',
      }}
    >
      <Box>
        <Typography gutterBottom variant="subtitle2" align="center">
          {__TITLE__}
        </Typography>
        <Box sx={{ width: { xs: 250, sm: 400 } }}>
          <LinearProgress color="success" />
        </Box>
      </Box>
    </Box>
  );
};

export default SplashScreen;
