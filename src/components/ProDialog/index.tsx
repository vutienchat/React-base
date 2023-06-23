import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';
import type { HTMLAttributes, ReactNode } from 'react';
import {
  cloneElement,
  forwardRef,
  Fragment,
  isValidElement,
  useImperativeHandle,
  useState,
} from 'react';
import type { DialogRef } from 'types/refs';

interface Props {
  open?: boolean;
  element?: ReactNode;
  children?: ReactNode;
  DialogProps?: Partial<DialogProps>;
}

const ProDialog = forwardRef<DialogRef, Props>((props, ref) => {
  const { children, open, element, DialogProps } = props;
  const [openDialog, setOpenDialog] = useState<boolean>(Boolean(open));

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  return (
    <Fragment>
      {isValidElement<HTMLAttributes<HTMLButtonElement>>(element)
        ? cloneElement(element, {
            onClick: handleOpen,
          })
        : null}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll="paper"
        PaperProps={{ elevation: 3, sx: { borderRadius: 3 } }}
        fullWidth
        {...DialogProps}
      >
        {children}
      </Dialog>
    </Fragment>
  );
});

export default ProDialog;
