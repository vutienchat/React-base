import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

interface Props {
  expanded: boolean;
  onExpand: () => void;
}

const ToggleFilter = (props: Props) => {
  const { expanded, onExpand } = props;
  return (
    <Tooltip title="Bật/tắt bộ lọc">
      <IconButton onClick={onExpand} color="primary">
        {expanded ? (
          <FilterListOffIcon fontSize="medium" />
        ) : (
          <FilterListIcon fontSize="medium" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleFilter;
