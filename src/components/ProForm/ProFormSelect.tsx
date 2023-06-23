import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import type { MenuItemProps } from '@mui/material/MenuItem';
import MenuItem from '@mui/material/MenuItem';
import type { SelectProps } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import useScrollbar from 'hooks/useScrollbar';
import { forwardRef, Fragment, useEffect } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PlaceHolder from './components/PlaceHolder';

interface Value<T> {
  key: string | number;
  label: string;
  value: T;
  disabled: boolean;
}

interface Props<O extends FieldValues, V extends string | number>
  extends Omit<SelectProps<V>, 'name' | 'renderValue' | 'onSelect' | 'value'> {
  name: string;
  options: O[];
  renderLabel?: (option: O) => string;
  renderValue?: (option: O) => V;
  getOptionDisabled?: (option: O) => boolean;
  onSelect?: (value: V) => void;
  placeholder: string;
  actionText?: string; // Like placeholder, but for instruction
}

const ProFormSelect = <O extends FieldValues, V extends string | number>(
  props: Props<O, V>
) => {
  const {
    name,
    label,
    options,
    renderLabel = (option) => option.label,
    renderValue = (option) => option.value,
    disabled,
    placeholder,
    actionText,
    getOptionDisabled,
    onSelect,
    required,
    ...rest
  } = props;

  const { t } = useTranslation();
  const scrollbar = useScrollbar();

  const { control, setValue } = useFormContext();

  const {
    field: { value, onChange, ...others },
    fieldState: { error },
  } = useController({ name, control });

  const entries = options.reduce<Record<string | number, Value<V>>>(
    (acc, option, i) => {
      const value = renderValue(option);
      const label = renderLabel(option);
      const disabled = getOptionDisabled?.(option) || false;
      acc[value] = { value, label, disabled, key: i };
      return acc;
    },
    {}
  );

  // Rollback
  useEffect(() => {
    if (value in entries || value === null) return;
    setValue(name, null);
  }, [value, entries, name, setValue]);

  return (
    <FormControl fullWidth error={Boolean(error)} disabled={disabled}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select<V>
        id={name}
        labelId={name}
        {...(disabled && {
          IconComponent: () => null,
        })}
        label={label}
        required={required}
        multiple={false}
        MenuProps={{
          MenuListProps: { dense: true },
          PaperProps: { sx: { maxHeight: 48 * 4.5 + 8, ...scrollbar } },
        }}
        renderValue={(value) => {
          if (!(value in entries)) {
            return <PlaceHolder>{!disabled && placeholder}</PlaceHolder>;
          }
          return <Fragment>{entries[value].label}</Fragment>;
        }}
        {...others}
        {...rest}
        value={value in entries ? value : -1}
        onChange={(event) => {
          onChange(event);
          onSelect?.(event.target.value as V);
        }}
      >
        {options.length > 0 && placeholder && (
          <PlainMenuItem value={-1} sx={{ display: 'none' }}>
            {placeholder}
          </PlainMenuItem>
        )}
        {!options.length && !actionText && (
          <PlainMenuItem value={-1}>{t('Không có lựa chọn')}</PlainMenuItem>
        )}
        {!options.length && actionText && (
          <PlainMenuItem value={-1}>{actionText}</PlainMenuItem>
        )}
        {Object.keys(entries).map((valueKey) => {
          const { value, label, disabled, key } = entries[valueKey];
          return (
            <MenuItem key={key} value={value} disabled={disabled}>
              <Typography variant="subtitle2">{label}</Typography>
            </MenuItem>
          );
        })}
      </Select>
      {error?.message && (
        <FormHelperText variant="outlined">{t(error.message)}</FormHelperText>
      )}
    </FormControl>
  );
};

const PlainMenuItem = forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  const { selected, ...rest } = props;
  return <MenuItem ref={ref} disabled selected={false} {...rest} />;
});

export default ProFormSelect;
