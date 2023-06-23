export interface DialogRef<T = any> {
  open: () => void;
  close: () => void;
  edit?: (value: T) => void;
  show?: (value: T) => void;
}

export interface FiltersRef<> {
  reset: () => void;
  submit: () => void;
}
