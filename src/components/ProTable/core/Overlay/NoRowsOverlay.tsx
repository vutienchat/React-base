import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { RefObject } from 'react';
import TableOverlay from './TableOverlay';

interface Props {
  visible?: boolean;
  root: RefObject<HTMLDivElement>;
}

const NoRowsOverlay = (props: Props) => {
  const { visible, root } = props;

  if (!visible) {
    return null;
  }

  return (
    <TableOverlay root={root}>
      <Box
        sx={{
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HorizontalSplitIcon
          fontSize="large"
          sx={{ color: 'text.secondary' }}
        />
        <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
          Không có dữ liệu
        </Typography>
      </Box>
    </TableOverlay>
  );
};

export default NoRowsOverlay;
