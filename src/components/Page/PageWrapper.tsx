import Container from '@mui/material/Container';
import { __TITLE__ } from 'config';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title?: string;
  children: [ReactNode, ReactNode];
}

const PageWrapper = (props: Props) => {
  const { title = __TITLE__, children } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container
        maxWidth={false}
        sx={{
          height: 1,
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          rowGap: 1.5,
          py: 3,
        }}
      >
        {children}
      </Container>
    </Fragment>
  );
};

export default PageWrapper;
