import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import type { FCC } from 'types/react';

const ExpanderActions: FCC = (props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Stack direction="row" spacing={1}>
        {children}
      </Stack>
    </Box>
  );
};

export default ExpanderActions;
