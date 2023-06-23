import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { FCC } from 'types/react';
import Stack from '@mui/material/Stack';

interface Props {
  title: string;
}

const ProFormHeaderAction: FCC<Props> = (props) => {
  const { title, children } = props;
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
          {title}
        </Typography>
        <Stack>{children}</Stack>
      </Box>
      <Divider />
    </Box>
  );
};

export default ProFormHeaderAction;
