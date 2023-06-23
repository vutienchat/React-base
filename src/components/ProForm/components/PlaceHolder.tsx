import { styled } from '@mui/material/styles';

const PlaceHolder = styled('span')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  opacity: 0.75,
  textOverflow: 'ellipsis',
  userSelect: 'none',
  pointerEvents: 'none',
}));

export default PlaceHolder;
