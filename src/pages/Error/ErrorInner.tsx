import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Page from 'components/Page';
import RouteLink from 'components/core/RouteLink';

const errors: Record<number, string> = {
  401: 'Access is denied due to invalid credentials. Please log in again.',
  404: "This page doesn't exist",
  403: "You don't have permission to access this page",
  500: "The server encountered something unexpected that didn't allow it to complete the request",
  503: 'The server is temporarily unable to service your request. Please try again later.',
};

interface Props {
  code?: number;
  statusText: string;
}

const ErrorInner = (props: Props) => {
  const { code, statusText } = props;

  return (
    <Page title={`Error: ${statusText}`}>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexGrow: 1,
          p: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography align="center" variant="h6" gutterBottom>
            {code && code in errors ? `${code}: ${statusText}` : 'Oops!'}
          </Typography>
          <Typography align="center" color="text.secondary" variant="subtitle2">
            {code && code in errors
              ? errors[code]
              : 'Sorry, an unexpected error has occurred'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <RouteLink to="/">
              <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                Back to Home
              </Button>
            </RouteLink>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default ErrorInner;
