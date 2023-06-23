import Paper from '@mui/material/Paper';
import type { ReactNode } from 'react';

interface Props {
  children: [ReactNode, ReactNode];
}

const ProFormContainer = (props: Props) => {
  const { children } = props;
  return (
    <Paper
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        rowGap: 2.5,
        p: 2.5,
        height: 1,
      }}
    >
      {children}
    </Paper>
  );
};

export default ProFormContainer;
