import Box from '@mui/material/Box';
import type { DialogContentProps } from '@mui/material/DialogContent';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';

interface Props extends DialogContentProps {
  loading?: boolean;
}

const DialogBody = (props: Props) => {
  const { children, loading, ...rest } = props;
  return (
    <DialogContent dividers sx={{ position: 'relative' }} {...rest}>
      {loading && (
        <Box sx={{ width: 1, position: 'absolute', top: 0, left: 0 }}>
          <LinearProgress sx={{ borderRadius: 0, height: 2 }} />
        </Box>
      )}
      {children}
    </DialogContent>
  );
};

export default DialogBody;
