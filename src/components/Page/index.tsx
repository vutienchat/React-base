import { __TITLE__ } from 'config';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import type { FCC } from 'types/react';

interface Props {
  title?: string;
}

const Page: FCC<Props> = (props) => {
  const { title = __TITLE__, children } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Fragment>
  );
};

export default Page;
