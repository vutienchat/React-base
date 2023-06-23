import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ProMenu from 'components/ProMenu';
import type { DensitySeverity } from '../types';

interface Props {
  selected: DensitySeverity;
  onChange: (density: DensitySeverity) => void;
}

const Density = (props: Props) => {
  const { selected, onChange } = props;

  return (
    <ProMenu<DensitySeverity>
      items={[
        { label: 'Mặc định', value: 'default' },
        { label: 'Bình thường', value: 'normal' },
        { label: 'Dày đặc', value: 'dense' },
      ]}
      selected={selected}
      onSelect={onChange}
      position="left"
    >
      <Tooltip title="Mật độ hiển thị">
        <IconButton>
          <CalendarViewDayIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    </ProMenu>
  );
};

export default Density;
