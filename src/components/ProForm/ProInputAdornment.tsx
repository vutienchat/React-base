import type { InputAdornmentProps } from '@mui/material/InputAdornment';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

interface Props extends Omit<InputAdornmentProps, 'position'> {
  position?: InputAdornmentProps['position'];
}

const ProInputAdornment = (props: Props) => {
  const { children, position = 'end', ...rest } = props;

  return (
    <InputAdornment position={position} {...rest}>
      <Typography variant="subtitle2">{children}</Typography>
    </InputAdornment>
  );
};

export default ProInputAdornment;
