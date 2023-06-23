import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import type { ColumnDef } from '@tanstack/react-table';

const Selection = <T extends object>() => {
  const component: ColumnDef<T, any> = {
    id: 'selection',
    size: 60,
    maxSize: 60,
    minSize: 60,
    enableSorting: false,
    header: (context) => (
      <Checkbox
        checked={context.table.getIsAllRowsSelected()}
        indeterminate={context.table.getIsSomeRowsSelected()}
        onChange={context.table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: (context) => (
      <Box>
        <Checkbox
          checked={context.row.getIsSelected()}
          indeterminate={context.row.getIsSomeSelected()}
          onChange={context.row.getToggleSelectedHandler()}
        />
      </Box>
    ),
    meta: {
      title: 'Select all',
      action: false,
    },
  };

  return component;
};

export default Selection;
