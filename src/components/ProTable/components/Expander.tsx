import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';
import type { ColumnDef } from '@tanstack/react-table';

const Expander = <T extends object>() => {
  const component: ColumnDef<T, any> = {
    id: 'expander',
    size: 65,
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <IconButton onClick={row.getToggleExpandedHandler()}>
          {row.getIsExpanded() ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )}
        </IconButton>
      ) : null;
    },
    meta: {
      title: 'Chỉnh sửa',
    },
  };

  return component;
};

export default Expander;
