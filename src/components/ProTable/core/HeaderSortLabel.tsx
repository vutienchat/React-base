import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import type { Header } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Fragment } from 'react';
import HeadInfo from './HeadInfo';

interface Props {
  header: Header<any, any>;
}

const HeaderSortLabel = (props: Props) => {
  const { header } = props;

  const canSort = header.column.getCanSort();
  const sorted = header.column.getIsSorted();
  const info = header.column.columnDef.meta?.info;
  const content = header.isPlaceholder
    ? null
    : flexRender(header.column.columnDef.header, header.getContext());

  if (!canSort) {
    return (
      <Fragment>
        {content}
        <HeadInfo title={info} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <TableSortLabel
        active={Boolean(sorted)}
        direction={sorted || void 0}
        onClick={header.column.getToggleSortingHandler()}
        hideSortIcon={!canSort}
      >
        {content}
        {sorted ? (
          <Box component="span" sx={visuallyHidden}>
            {true ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
      <HeadInfo title={info} />
    </Fragment>
  );
};

export default HeaderSortLabel;
