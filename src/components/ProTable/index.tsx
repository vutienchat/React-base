import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type {
  ColumnPinningState,
  ExpandedState,
  OnChangeFn,
  Row,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import ProFormProvider from 'components/ProForm/ProFormProvider';
import useScrollbar from 'hooks/useScrollbar';
import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { DispatchWithoutAction, ReactNode, ForwardedRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import TypedObject from 'utils/TypedObject';
import HeadActions from './core/HeadActions';
import HeaderSortLabel from './core/HeaderSortLabel';
import LoadingOverlay from './core/Overlay/LoadingOverlay';
import NoRowsOverlay from './core/Overlay/NoRowsOverlay';
import TableOverlay from './core/Overlay/TableOverlay';
import Refresh from './core/Refresh';
import ToggleFilter from './core/ToggleFilter';
import VisibilityColumns from './core/VisibilityColumns';
import ProTableCell from './ProTableCell';
import type { ProTablePaginationProps } from './ProTablePagination';
import ProTablePagination from './ProTablePagination';
import type { ColumnPinning, ProColumn } from './types';
import type { TableRef } from './types/refs';
import getRowSelections from './utils/getRowSelections';

interface Initialstate<T> {
  hiddenColumns?: (keyof T)[];
  hiddenFilterActions?: boolean;
  hiddenVisibilityColumns?: boolean;
  hiddenRefresh?: boolean;
  columnPinning?: ColumnPinning<T>;
}

interface Props<T> {
  pagination: ProTablePaginationProps;
  data: T[];
  toolBar?: ReactNode;
  filter?: ReactNode;
  title?: string;
  loading?: boolean;
  columns: ProColumn<T>;
  refetch?: DispatchWithoutAction;
  onSortingChange?: (sortingState: SortingState) => void;
  onRowSelectionChange?: (rowIds: string[]) => void;
  onRowEditableChange?: (rowEditableState: Record<string, boolean>) => void;
  initialstate?: Initialstate<T>;
  expander?: (props: { row: Row<T>; onClose: () => void }) => JSX.Element;
  getRowId?: (row: T, index: number) => string;
  getRowCanExpand?: (row: Row<T>) => boolean;
  editable?: boolean;
  form?: UseFormReturn<any, any>;
}

const ProTable = <T extends object>(
  props: Props<T>,
  tableRef: ForwardedRef<TableRef>
) => {
  const {
    toolBar,
    filter,
    data,
    pagination,
    title,
    loading,
    columns,
    refetch,
    onSortingChange,
    onRowSelectionChange,
    onRowEditableChange,
    expander,
    getRowId,
    getRowCanExpand,
    form,
    initialstate = {
      hiddenColumns: [],
      hiddenVisibilityColumns: true,
      columnPinning: {
        left: [],
        right: [],
      },
    },
  } = props;

  const scrollbar = useScrollbar();
  const containerRef = useRef<HTMLDivElement>(null);
  const [stickyHeader] = useState<boolean>(true);
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const [hiddenFilterActions] = useState<boolean>(() => {
    const { hiddenFilterActions } = initialstate;
    if (typeof hiddenFilterActions === 'boolean') {
      return hiddenFilterActions;
    }
    return true;
  });

  const [hiddenVisibilityColumns] = useState<boolean>(() => {
    const { hiddenVisibilityColumns } = initialstate;
    if (typeof hiddenVisibilityColumns === 'boolean') {
      return hiddenVisibilityColumns;
    }
    return true;
  });

  const [hiddenRefresh] = useState<boolean>(() => {
    const { hiddenRefresh } = initialstate;
    if (typeof hiddenRefresh === 'boolean') {
      return hiddenRefresh;
    }
    return true;
  });

  // Selection state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Visibility state
  const [columnVisibility, onColumnVisibilityChange] =
    useState<VisibilityState>(() => {
      const hiddenColumns = (initialstate.hiddenColumns as string[]) || [];
      return hiddenColumns.reduce<VisibilityState>((acc, column) => {
        acc[column] = false;
        return acc;
      }, {});
    });

  // Sorting state
  const [sorting, setSorting] = useState<SortingState>([]);

  // Pinning state
  const [columnPinning, onColumnPinningChange] = useState<ColumnPinningState>(
    () => {
      const { left = [] } = initialstate.columnPinning || {};
      return {
        left: ['selection', 'expander', 'index', ...left],
        right: ['actions'],
      };
    }
  );

  // Expanded state
  const [expanded, onExpandedChange] = useState<ExpandedState>({});

  // Editable state
  const [editableRows, setEditableRows] = useState<Record<string, boolean>>({});

  // Handle sorting
  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    new Promise<SortingState>((resolve) => {
      setSorting((state) => {
        const updatedState =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(state)
            : updaterOrValue;
        resolve(updatedState);
        return updatedState;
      });
    }).then((value) => {
      onSortingChange?.(value);
    });
  };

  // Handle row selection
  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = (
    updaterOrValue
  ) => {
    new Promise<RowSelectionState>((resolve) => {
      setRowSelection((state) => {
        const updatedState =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(state)
            : updaterOrValue;
        resolve(updatedState);
        return updatedState;
      });
    }).then((value) => {
      onRowSelectionChange?.(getRowSelections(value));
    });
  };

  // Handle edit mode
  const handleToggleEditableRow = (rowId: string) => {
    new Promise<Record<string, boolean>>((resolve) => {
      setEditableRows((state) => {
        if (rowId in editableRows) {
          const { [rowId]: removed, ...updatedState } = state;
          resolve(updatedState);
          return updatedState;
        } else {
          const updatedState = { ...state, [rowId]: true };
          resolve(updatedState);
          return updatedState;
        }
      });
    }).then((state) => {
      onRowEditableChange?.(state);
    });
  };

  const handleStartRowEditMode = (rowId: string) => {
    new Promise<Record<string, boolean>>((resolve) => {
      setEditableRows((state) => {
        const updatedState = { ...state, [rowId]: true };
        resolve(updatedState);
        return updatedState;
      });
    }).then((state) => {
      onRowEditableChange?.(state);
    });
  };

  const handleStopRowEditMode = (rowId: string) => {
    new Promise<Record<string, boolean>>((resolve) => {
      setEditableRows((state) => {
        const { [rowId]: removed, ...updatedState } = state;
        resolve(updatedState);
        return updatedState;
      });
    }).then((state) => {
      onRowEditableChange?.(state);
    });
  };

  const handleGetIsEdited = (rowId: string) => {
    return rowId in editableRows;
  };

  const getIsSomeRowsEdited = () => {
    return TypedObject.isExist(editableRows);
  };

  const table = useReactTable<T>({
    columns,
    data,
    state: {
      sorting,
      expanded,
      columnPinning,
      rowSelection,
      columnVisibility,
    },
    getRowId,
    onSortingChange: handleSortingChange,
    onRowSelectionChange: handleRowSelectionChange,
    onColumnVisibilityChange,
    onColumnPinningChange,
    onExpandedChange,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand,
    enablePinning: true,
    enableHiding: true,
    enableSorting: true,
    enableRowSelection: true,
    enableMultiSort: false,
    defaultColumn: {
      size: 150,
      // minSize: 150,
      // maxSize: 150,
    },
    meta: {
      editableRows,
      toggleEditableRow: handleToggleEditableRow,
      startRowEditMode: handleStartRowEditMode,
      stopRowEditMode: handleStopRowEditMode,
      getIsEdited: handleGetIsEdited,
      getIsSomeRowsEdited: getIsSomeRowsEdited,
    },
  });

  const { getHeaderGroups, getRowModel, resetRowSelection, resetExpanded } =
    table;

  const handleExpandFilter = () => {
    setCollapsed(!collapsed);
  };

  // const handleChangeDensity = (density: DensitySeverity) => {
  //   setDensity(density);
  // };

  const handleAddRowSelection = (index: number) => {
    new Promise<RowSelectionState>((resolve) => {
      setRowSelection((state) => {
        const updatedState = { ...state, [index]: true };
        resolve(updatedState);
        return updatedState;
      });
    }).then((state) => {
      onRowSelectionChange?.(getRowSelections(state));
    });
  };

  const handleResetRowSelection = () => {
    resetRowSelection(true);
    onRowSelectionChange?.([]);
  };

  const handleResetRowExpanded = () => {
    resetExpanded(true);
  };

  const handleResetEditableRow = () => {
    setEditableRows({});
  };

  useImperativeHandle(tableRef, () => ({
    resetRowSelection: handleResetRowSelection,
    resetRowExpanded: handleResetRowExpanded,
    addRowSelection: handleAddRowSelection,
    toggleEditableRow: handleToggleEditableRow,
    startRowEditMode: handleStartRowEditMode,
    stopRowEditMode: handleStopRowEditMode,
    resetEditableRow: handleResetEditableRow,
    getIsSomeRowsEdited: getIsSomeRowsEdited,
  }));

  return (
    <Paper
      elevation={12}
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto auto minmax(0, 1fr) auto',
        height: 1,
      }}
    >
      <Collapse in={collapsed} timeout="auto">
        {filter}
      </Collapse>
      <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Stack>{toolBar}</Stack>
        <Stack>
          {!hiddenRefresh && <Refresh onRefresh={refetch} />}
          {!hiddenVisibilityColumns && <VisibilityColumns table={table} />}
          {!hiddenFilterActions && (
            <ToggleFilter expanded={collapsed} onExpand={handleExpandFilter} />
          )}
        </Stack>
      </Box>
      <ProFormProvider form={form}>
        <TableContainer
          ref={containerRef}
          sx={{
            height: 1,
            width: 1,
            border: 1,
            overflow: 'auto',
            borderColor: 'divider',
            position: 'relative',
            ...scrollbar,
          }}
        >
          <Table
            stickyHeader={stickyHeader}
            sx={{
              minWidth: 'max-content',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <TableHead>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const leftOffset = header.column.getStart('left');
                    const rightOffset = header.column.getStart('right');
                    const width = header.getSize();
                    const maxWidth = header.column.columnDef.maxSize;
                    const minWidth = header.column.columnDef.minSize;
                    const align = header.column.columnDef.meta?.align;

                    return (
                      <ProTableCell
                        key={header.id}
                        header
                        align={align}
                        leftOffset={leftOffset}
                        rightOffset={rightOffset}
                        colSpan={header.colSpan}
                        fixed={header.column.getIsPinned()}
                        sortDirection={header.column.getIsSorted()}
                        sx={{ width, maxWidth, minWidth }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent:
                              align === 'center' ? 'center' : 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <HeaderSortLabel header={header} />
                          <HeadActions header={header} />
                        </Box>
                      </ProTableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {getRowModel().rows.map((row) => {
                // const selected = editable ? false : row.getIsSelected(); // Remove bground
                const selected = row.getIsSelected();
                const expanded = row.getIsExpanded();
                return (
                  <Fragment key={row.id}>
                    <TableRow hover tabIndex={-1} selected={selected}>
                      {row.getVisibleCells().map((cell, index) => {
                        const leftOffset = cell.column.getStart('left');
                        const rightOffset = cell.column.getStart('right');
                        const fixed = cell.column.getIsPinned();
                        const align = cell.column.columnDef.meta?.align;

                        return (
                          <ProTableCell
                            key={cell.id}
                            fixed={fixed}
                            align={align}
                            selected={selected}
                            leftOffset={leftOffset}
                            rightOffset={rightOffset}
                            sx={{
                              ...(expanded &&
                                index === 0 && {
                                  '&:after': {
                                    position: 'absolute',
                                    content: '" "',
                                    top: 0,
                                    left: 0,
                                    backgroundColor: 'primary.main',
                                    width: 3,
                                    height: 'calc(100% + 1px)',
                                  },
                                }),
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </ProTableCell>
                        );
                      })}
                    </TableRow>
                    {row.getCanExpand() && expanded && (
                      <TableRow>
                        <ProTableCell
                          sx={{ p: 0 }}
                          colSpan={row.getVisibleCells().length}
                          leftOffset={0}
                          rightOffset={0}
                        >
                          <TableOverlay root={containerRef}>
                            {expander?.({
                              row,
                              onClose: row.getToggleExpandedHandler(),
                            })}
                          </TableOverlay>
                        </ProTableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
          <LoadingOverlay root={containerRef} visible={loading} />
          <NoRowsOverlay
            root={containerRef}
            visible={!loading && pagination.total === 0}
          />
        </TableContainer>
      </ProFormProvider>
      <ProTablePagination {...pagination} />
    </Paper>
  );
};

export default forwardRef(ProTable);
