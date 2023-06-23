import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

interface Props {
  children: [ReactNode, ReactNode];
}

const ExpanderContainer = (props: Props) => {
  const { children } = props;
  return (
    <Box sx={{ display: 'grid', gridTemplateRows: '1fr auto', gap: 2 }}>
      {children}
    </Box>
  );
};

export default ExpanderContainer;
