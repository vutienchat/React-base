import GlobalStyles from '@mui/material/GlobalStyles';

const GlobalCssBaseline = () => {
  return (
    <GlobalStyles
      styles={{
        html: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: 'auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        '#root': {
          display: 'flex',
          flex: 'auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
        '#nprogress': {
          pointerEvents: 'none',
        },
        '#nprogress .bar': {
          backgroundColor: '#00AB55',
          position: 'fixed',
          zIndex: 1998,
          top: 0,
          left: 0,
          width: '100%',
          height: 3,
        },
      }}
    />
  );
};

export default GlobalCssBaseline;
