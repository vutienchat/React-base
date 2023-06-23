import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import type { ElementType } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Icons = {
  view: VisibilityIcon,
  edit: EditIcon,
} as const;

interface Props {
  actionType?: keyof typeof Icons;
}

const LinkIconButton = <C extends ElementType>(
  props: IconButtonProps<C, { component?: C } & Props>
) => {
  const { to, children, disabled, actionType, IconButtonProps, ...rest } =
    props;

  const StartIcon = actionType && Icons[actionType];

  if (disabled) {
    return (
      <IconButton {...IconButtonProps} disabled={disabled}>
        {children || (StartIcon && <StartIcon />)}
      </IconButton>
    );
  }

  return (
    <Link component={RouterLink} to={to} {...rest}>
      <IconButton {...IconButtonProps}>
        {children || (StartIcon && <StartIcon />)}
      </IconButton>
    </Link>
  );
};

export default LinkIconButton;
