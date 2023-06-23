import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import type { MenuItemProps } from '@mui/material/MenuItem';
import MenuItem from '@mui/material/MenuItem';
import type { SelectProps } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import PlaceHolder from 'components/ProForm/components/PlaceHolder';
import useScrollbar from 'hooks/useScrollbar';
import { forwardRef, Fragment, useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Validation from 'utils/Validation';
import type { AnySchema } from 'yup';

interface Option<T> {
  value: T;
  label: string;
}

interface Value<T> {
  key: string | number;
  label: string;
  value: T;
  disabled: boolean;
}

export interface FormSelectProps<T extends string | number = number>
  extends Omit<SelectProps<T>, 'name' | 'renderValue' | 'onSelect' | 'value'> {
  name: string;
  options?: Option<T>[];
  getOptionDisabled?: (option: Option<T>) => boolean;
  onSelect?: (value: T) => void;
  placeholder?: string;
  validate?: AnySchema;
}

const ProFormSelect = <T extends string | number>(
  props: FormSelectProps<T>
) => {
  const {
    name,
    label,
    options = [],
    disabled,
    placeholder,
    getOptionDisabled,
    onSelect,
    required,
    validate,
    defaultValue,
    ...rest
  } = props;

  const { t } = useTranslation();
  const scrollbar = useScrollbar();

  const { control, setValue } = useFormContext();

  const {
    field: { value, onChange, ...others },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: validate ? validate.getDefault() : defaultValue,
    rules: { validate: Validation.validate(validate) },
  });

  const entries = options.reduce<Record<string | number, Value<T>>>(
    (acc, option, i) => {
      const { value, label } = option;
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
      <Select<T>
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
          onSelect?.(event.target.value as T);
        }}
      >
        {options.length > 0 && placeholder && (
          <PlainMenuItem value={-1} sx={{ display: 'none' }}>
            {placeholder}
          </PlainMenuItem>
        )}
        {!options.length && (
          <PlainMenuItem value={-1}>{t('Không có lựa chọn')}</PlainMenuItem>
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
