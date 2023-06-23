import { styled } from '@mui/material/styles';

const ProTableContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gap: theme.spacing(2),
  height: '100%',
}));

export default ProTableContainer;
