import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { __TITLE__ } from 'config';

const PageLoading = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        gridRowStart: 2,
        height: 1,
      }}
    >
      <Box>
        <Typography gutterBottom variant="subtitle2" align="center">
          {__TITLE__}
        </Typography>
        <Box sx={{ width: { xs: 250, sm: 400 } }}>
          <LinearProgress />
        </Box>
      </Box>
    </Box>
  );
};

export default PageLoading;
