import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { FCC } from 'types/react';

const ProFormHeader: FCC = (props) => {
  const { children } = props;
  return (
    <Box>
      <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1.5 }}>
        {children}
      </Typography>
      <Divider />
    </Box>
  );
};

export default ProFormHeader;
