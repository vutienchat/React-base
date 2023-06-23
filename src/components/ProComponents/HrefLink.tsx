import Link from '@mui/material/Link';
import type { LinkProps } from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const HrefLink = (props: LinkProps) => {
  const { children, ...rest } = props;
  return (
    <Link underline="none" target="_blank" rel="noopener" {...rest}>
      <Typography variant="body2" noWrap>
        {children}
      </Typography>
    </Link>
  );
};

export default HrefLink;
