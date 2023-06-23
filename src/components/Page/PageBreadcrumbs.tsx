import Box from '@mui/material/Box';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

interface Breadcrumb {
  text: string;
  link: string;
}

interface Props {
  category?: string;
  items: Breadcrumb[];
  title: string;
  home?: boolean;
}

const PageBreadcrumbs = (props: Props) => {
  const { title, home = false, items, category } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Breadcrumbs
        sx={{
          [`& > .${breadcrumbsClasses.ol}`]: {
            alignItems: 'baseline',
          },
        }}
      >
        {!home && (
          <Link component={RouterLink} to="/" variant="subtitle2">
            Home
          </Link>
        )}
        {category && (
          <Typography variant="subtitle2" color="primary.main">
            {category}
          </Typography>
        )}
        {items.map((item, i) => {
          const { text, link } = item;
          return (
            <Link key={i} component={RouterLink} to={link} variant="subtitle2">
              {text}
            </Link>
          );
        })}
        <Typography variant="subtitle2" color="primary.main">
          {title}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default PageBreadcrumbs;
