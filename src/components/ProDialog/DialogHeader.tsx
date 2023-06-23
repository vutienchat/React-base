import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import type { FCC } from 'types/react';

interface Props {
  onClose?: () => void;
}

const DialogHeader: FCC<Props> = (props) => {
  const { children, onClose } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2.5,
        py: 2,
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
        {children}
      </Typography>
      {typeof onClose === 'function' && (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default DialogHeader;
