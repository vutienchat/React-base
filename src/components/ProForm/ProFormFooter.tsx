import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

const ProFormFooter = (props: BoxProps) => {
  const { children, ...rest } = props;
  return (
    <Box {...rest}>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Stack>{children}</Stack>
      </Box>
    </Box>
  );
};

export default ProFormFooter;
