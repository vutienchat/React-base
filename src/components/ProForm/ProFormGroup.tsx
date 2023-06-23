import type { FormGroupProps } from '@mui/material/FormGroup';
import FormGroup from '@mui/material/FormGroup';

interface Props extends FormGroupProps {
  margin?: 'normal' | 'dense';
}

const ProFormGroup = (props: Props) => {
  const { children, margin = 'normal', ...rest } = props;

  return (
    <FormGroup
      sx={{
        '& > * + *': {
          mt: margin === 'normal' ? 2 : 1,
        },
      }}
      {...rest}
    >
      {children}
    </FormGroup>
  );
};

export default ProFormGroup;
