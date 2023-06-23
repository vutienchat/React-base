export interface TableRef {
  resetRowSelection: () => void;
  resetRowExpanded: () => void;
  addRowSelection: (index: number) => void;
  toggleEditableRow: (rowId: string, remove?: boolean) => void;
  startRowEditMode: (rowId: string) => void;
  stopRowEditMode: (rowId: string) => void;
  resetEditableRow: () => void;
  getIsSomeRowsEdited: () => boolean;
}
