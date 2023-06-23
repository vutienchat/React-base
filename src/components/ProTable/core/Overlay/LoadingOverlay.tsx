import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import type { RefObject } from 'react';
import TableOverlay from './TableOverlay';

interface Props {
  visible?: boolean;
  root: RefObject<HTMLDivElement>;
}

const LoadingOverlay = (props: Props) => {
  const { visible, root } = props;

  if (!visible) {
    return null;
  }

  return (
    <TableOverlay root={root} backdrop above>
      <Box
        sx={{
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    </TableOverlay>
  );
};

export default LoadingOverlay;
