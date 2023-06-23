import type { CellContext } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import type { FormDateProps } from './ProFormDate';
import ProFormDate from './ProFormDate';
import type { FormSelectProps } from './ProFormSelect';
import ProFormSelect from './ProFormSelect';
import type { FormTextFieldProps } from './ProFormTextField';
import ProFormTextField from './ProFormTextField';

interface Props<T> {
  context: CellContext<T, any>;
  FormTextFieldProps?: Partial<FormTextFieldProps>;
  FormSelectProps?: Partial<FormSelectProps>;
  FormDateProps?: Partial<FormDateProps>;
  render?: (context: CellContext<T, any>) => ReactNode;
}

const EditableCell = <T extends object>(props: Props<T>) => {
  const {
    context,
    render,
    FormTextFieldProps,
    FormSelectProps,
    FormDateProps,
  } = props;
  const rowIndex = context.row.index;
  const rowId = context.row.id;
  const columnId = context.column.id;
  const isEditing = context.table.options.meta?.getIsEdited(rowId);
  const type = context.column.columnDef.meta?.type;
  const updaterOrEdiable = context.column.columnDef.meta?.editable;
  const name = `form.${rowIndex}.${columnId}`;

  const editable =
    typeof updaterOrEdiable === 'function'
      ? updaterOrEdiable(context.row.original)
      : updaterOrEdiable;

  if (!editable || !isEditing) {
    return <Fragment>{render ? render(context) : context.getValue()}</Fragment>;
  }

  switch (type) {
    case 'text':
      return <ProFormTextField name={name} {...FormTextFieldProps} />;
    case 'select':
      return <ProFormSelect name={name} {...FormSelectProps} />;
    case 'date':
      return <ProFormDate name={name} {...FormDateProps} />;
    default:
      return null;
  }
};

export default EditableCell;
