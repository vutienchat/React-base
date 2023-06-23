import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RouteLink from 'components/core/RouteLink';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'store';

const Document = () => {
  const { t } = useTranslation();
  const openSidebar = useTypedSelector((state) => state.menu.sidebarOpen);

  if (openSidebar) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="neutral.100" variant="subtitle2">
          {t('Need Help?')}
        </Typography>
        <Typography color="neutral.500" variant="body2">
          {t('Check our docs')}
        </Typography>
        <RouteLink to="/docs/welcome">
          <Button color="secondary" fullWidth size="medium" sx={{ mt: 2 }}>
            {t('Documentation')}
          </Button>
        </RouteLink>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Box>
  );
};

export default Document;
