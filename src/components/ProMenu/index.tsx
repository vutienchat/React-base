import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { MenuProps } from '@mui/material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import type {
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
} from 'react';
import { cloneElement, Fragment, isValidElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GradeIcon from '@mui/icons-material/Grade';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const icons = {
  delete: DeleteIcon,
  edit: EditIcon,
  save: SaveIcon,
  cancel: CloseIcon,
  sub: IndeterminateCheckBoxOutlinedIcon,
  view: VisibilityIcon,
  grade: GradeIcon,
  point: KeyboardDoubleArrowUpIcon,
} as const;

type Trigger = 'click' | 'hover' | 'contextMenu';

type Item<T> =
  | {
      label: string;
      value: T;
      disabled?: boolean;
      onSelect?: MouseEventHandler<HTMLLIElement>;
      actionType?: keyof typeof icons;
    }
  | {
      label: string;
      to: string;
      isNewTab?: boolean;
      disabled?: boolean;
      actionType?: keyof typeof icons;
    }
  | { type: 'divider' };

interface Origin {
  anchorOrigin: MenuProps['anchorOrigin'];
  transformOrigin: MenuProps['transformOrigin'];
}

interface Props<T extends string | number> {
  trigger?: Trigger[];
  MenuProps?: Partial<MenuProps>;
  children: ReactElement<any>;
  items: Item<T>[];
  selected?: T;
  onSelect?: (value: T) => void;
  position?: 'left' | 'right';
}

const ProMenu = <T extends string | number>(props: Props<T>) => {
  const {
    trigger = ['click'],
    children,
    MenuProps,
    items,
    selected,
    onSelect,
    position,
  } = props;
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleChange = (value: T) => () => {
    onSelect?.(value);
    handleClose();
  };

  const origin: Origin | {} =
    position === 'left'
      ? {
          anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
          transformOrigin: { vertical: 'top', horizontal: 'right' },
        }
      : {};

  return (
    <Fragment>
      {isValidElement<HTMLAttributes<HTMLButtonElement>>(children)
        ? cloneElement(children, {
            onClick: trigger.includes('click') ? handleClick : void 0,
          })
        : null}
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        PaperProps={{ sx: { mt: 1 } }}
        MenuListProps={{ dense: true }}
        {...origin}
        {...MenuProps}
      >
        {items.map((item, i) => {
          if ('type' in item) {
            return <Divider key={i} />;
          } else if ('to' in item) {
            const { label, to, isNewTab, actionType, disabled } = item;

            const Icon = actionType && icons[actionType];

            return (
              <MenuItem
                key={i}
                disabled={disabled}
                onClick={handleClose}
                component={RouterLink}
                {...(isNewTab && {
                  target: '_blank',
                  rel: 'noopener',
                })}
                to={to}
              >
                {Icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}
                <ListItemText>
                  <Typography variant="body2">{label}</Typography>
                </ListItemText>
              </MenuItem>
            );
          }

          const { label, value, disabled, onSelect, actionType } = item;

          const Icon = actionType && icons[actionType];

          const handleClick: MouseEventHandler<HTMLLIElement> = (event) => {
            onSelect?.(event);
            handleClose();
          };

          return (
            <MenuItem
              key={i}
              onClick={onSelect ? handleClick : handleChange(value)}
              selected={selected === value}
              disabled={disabled}
            >
              {Icon && (
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
              )}
              <ListItemText>
                <Typography variant="body2">{label}</Typography>
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
};

export default ProMenu;
