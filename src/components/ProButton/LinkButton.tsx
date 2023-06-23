import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { ElementType } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Icons = {
  back: ArrowBackIcon,
  create: AddIcon,
  edit: EditIcon,
  save: SaveIcon,
  forward: ArrowForwardIcon,
};

interface Props {
  actionType?: keyof typeof Icons;
}

const LinkButton = <C extends ElementType>(
  props: ButtonProps<C, { component?: C } & Props>
) => {
  const { to, children, actionType, ...rest } = props;

  const StartIcon = actionType && Icons[actionType];

  return (
    <Button
      component={RouterLink}
      to={to}
      variant="outlined"
      startIcon={StartIcon && <StartIcon />}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
