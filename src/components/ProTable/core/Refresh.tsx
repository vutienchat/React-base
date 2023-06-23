import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  onRefresh?: () => void;
}

const Refresh = (props: Props) => {
  const { onRefresh } = props;

  if (typeof onRefresh !== 'function') {
    return null;
  }

  return (
    <Tooltip title="Làm mới">
      <IconButton onClick={onRefresh} color="primary">
        <RefreshIcon fontSize="medium" />
      </IconButton>
    </Tooltip>
  );
};

export default Refresh;
