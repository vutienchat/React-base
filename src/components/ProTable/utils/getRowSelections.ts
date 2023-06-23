import type { RowSelectionState } from '@tanstack/react-table';

const getRowSelections = (rowSelectionState: RowSelectionState) => {
  return Object.keys(rowSelectionState).filter(
    (rowIndex) => rowSelectionState[rowIndex]
  );
};

export default getRowSelections;
