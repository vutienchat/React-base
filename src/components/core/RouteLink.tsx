import type { LinkProps } from '@mui/material/Link';
import Link from '@mui/material/Link';
import type { ElementType } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const RouteLink = <C extends ElementType>(
  props: LinkProps<C, { component?: C }>
) => {
  const { to, children, ...rest } = props;

  return (
    <Link component={RouterLink} to={to} underline="none" {...rest}>
      {children}
    </Link>
  );
};

export default RouteLink;
