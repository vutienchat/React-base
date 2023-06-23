import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { Table, VisibilityState } from '@tanstack/react-table';
import ProPopover from 'components/ProPopover';
import useScrollbar from 'hooks/useScrollbar';
import { useState } from 'react';

interface Props<T> {
  table: Table<T>;
}

const VisibilityColumns = <T extends object>(props: Props<T>) => {
  const { table } = props;
  const scrollbar = useScrollbar();
  const [columnVisibility] = useState<VisibilityState>(() => {
    return table.getState().columnVisibility;
  });

  const handleResetColumnVisibility = () => {
    table.setColumnVisibility(columnVisibility);
  };

  return (
    <ProPopover
      element={
        <Tooltip title="Điều chỉnh cột">
          <IconButton color="primary">
            <ViewColumnIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      }
      PaperProps={{
        sx: {
          mt: 1,
          maxHeight: 32 * 10 + 16,
          overflowY: 'auto',
          ...scrollbar,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
        }}
      >
        <FormControlLabel
          label={
            <Typography variant="subtitle2" sx={{ ml: 1 }}>
              Hiển thị tất cả
            </Typography>
          }
          sx={{ m: 0 }}
          control={
            <Checkbox
              checked={table.getIsAllColumnsVisible()}
              indeterminate={
                table.getIsSomeColumnsVisible() &&
                !table.getIsAllColumnsVisible()
              }
              onChange={table.getToggleAllColumnsVisibilityHandler()}
            />
          }
        />
        <Button variant="text" onClick={handleResetColumnVisibility}>
          Đặt lại
        </Button>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', px: 2, py: 1.5 }}>
        {table
          .getAllLeafColumns()
          .filter((column) => !['index', 'actions'].includes(column.id))
          .map((column, i) => {
            const { title } = column.columnDef.meta || {};
            return (
              <FormControlLabel
                key={i}
                label={
                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    {title}
                  </Typography>
                }
                sx={{ m: 0, '& + &': { mt: 1 } }}
                control={
                  <Checkbox
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                  />
                }
              />
            );
          })}
      </Box>
    </ProPopover>
  );
};

export default VisibilityColumns;
