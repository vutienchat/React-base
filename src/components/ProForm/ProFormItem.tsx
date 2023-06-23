import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';

const ProFormItem = (props: BoxProps) => {
  const { children, ...rest } = props;
  return (
    <Box sx={{ '& + &': { mt: 2 } }} {...rest}>
      {children}
    </Box>
  );
};

export default ProFormItem;
