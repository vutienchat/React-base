import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { Header } from '@tanstack/react-table';
import ProMenu from 'components/ProMenu';
import { HEAD_ACTIONS } from '../constants';
import type { HeadAction } from '../types';

interface Props {
  header: Header<any, any>;
}

const HeadActions = (props: Props) => {
  const { header } = props;

  const action = header.column.columnDef.meta?.action;

  if (!action) {
    return null;
  }

  const canPin = header.column.getCanPin();
  const canHide = header.column.getCanHide();
  const canSort = header.column.getCanSort();

  const pinned = header.column.getIsPinned();
  const sorted = header.column.getIsSorted();

  const handleChange = (value: HeadAction) => {
    switch (value) {
      case HEAD_ACTIONS.unsort: {
        if (!canSort) return;
        header.column.clearSorting();
        break;
      }
      case HEAD_ACTIONS.desc: {
        if (!canSort) return;
        header.column.toggleSorting(true);
        break;
      }
      case HEAD_ACTIONS.asc: {
        if (!canSort) return;
        header.column.toggleSorting(false);
        break;
      }
      case HEAD_ACTIONS.hide: {
        if (!canHide) return;
        header.column.toggleVisibility(false);
        break;
      }
      case HEAD_ACTIONS.pinLeft: {
        if (!canPin) return;
        header.column.pin('left');
        break;
      }
      case HEAD_ACTIONS.pinRight: {
        if (!canPin) return;
        header.column.pin('right');
        break;
      }
      case HEAD_ACTIONS.unpin: {
        if (!canPin) return;
        header.column.pin(false);
        break;
      }
      default:
        break;
    }
  };

  return (
    <ProMenu<HeadAction>
      items={[
        {
          label: 'Không sắp xếp',
          value: 'unsort',
          disabled: !canSort || sorted === false,
        },
        {
          label: 'Sắp xếp tăng dần',
          value: 'asc',
          disabled: !canSort || sorted === 'asc',
        },
        {
          label: 'Sắp xếp giảm dần',
          value: 'desc',
          disabled: !canSort || sorted === 'desc',
        },
        { type: 'divider' },
        { label: 'Ẩn cột', value: 'hide', disabled: !canHide },
        { type: 'divider' },
        {
          label: 'Ghim sang trái',
          value: 'pinLeft',
          disabled: !canPin || pinned === 'left',
        },
        {
          label: 'Ghim sang phải',
          value: 'pinRight',
          disabled: !canPin || pinned === 'right',
        },
        {
          label: 'Bỏ ghim',
          value: 'unpin',
          disabled: !canPin || pinned === false,
        },
      ]}
      onSelect={handleChange}
    >
      <Tooltip title="Công cụ">
        <IconButton sx={{ ml: 1 }}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
    </ProMenu>
  );
};

export default HeadActions;
