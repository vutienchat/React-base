import type { PaperProps } from '@mui/material/Paper';
import type { PopoverProps } from '@mui/material/Popover';
import Popover from '@mui/material/Popover';
import type {
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { cloneElement, Fragment, isValidElement, useState } from 'react';

type Trigger = 'click' | 'hover';

interface Props extends Omit<PopoverProps, 'open'> {
  trigger?: Trigger[];
  element: ReactElement;
  children: ReactNode;
  PaperProps?: Partial<PaperProps>;
}

const ProPopover = (props: Props) => {
  const { trigger = ['click'], element, children, ...rest } = props;
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Fragment>
      {isValidElement<HTMLAttributes<HTMLButtonElement>>(element)
        ? cloneElement(element, {
            onClick: trigger.includes('click') ? handleClick : void 0,
          })
        : null}
      <Popover
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        PaperProps={{ sx: { mt: 1 } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...rest}
      >
        {children}
      </Popover>
    </Fragment>
  );
};

export default ProPopover;
