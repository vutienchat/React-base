import type { DialogActionsProps } from '@mui/material/DialogActions';
import DialogActions from '@mui/material/DialogActions';

const DialogFooter = (props: DialogActionsProps) => {
  const { children, ...rest } = props;

  return (
    <DialogActions sx={{ px: 2.5, py: 2 }} {...rest}>
      {children}
    </DialogActions>
  );
};

export default DialogFooter;
