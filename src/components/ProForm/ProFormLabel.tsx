import type { FormLabelProps } from '@mui/material/FormLabel';
import { Fragment } from 'react';
import type { FCC } from 'types/react';
import Typography from '@mui/material/Typography';
import FormLabel, { formLabelClasses } from '@mui/material/FormLabel';

interface Props extends FormLabelProps {
  title: string;
  name: string;
}

const ProFormLabel: FCC<Props> = (props) => {
  const { title, name, children, ...rest } = props;

  return (
    <Fragment>
      <FormLabel
        sx={{
          [`& .${formLabelClasses.asterisk}`]: {
            color: 'error.main',
          },
        }}
        htmlFor={name}
        {...rest}
      >
        <Typography
          variant="body2"
          sx={{ display: 'inline-block' }}
          gutterBottom
        >
          {title}
        </Typography>
      </FormLabel>
      {children}
    </Fragment>
  );
};

export default ProFormLabel;
