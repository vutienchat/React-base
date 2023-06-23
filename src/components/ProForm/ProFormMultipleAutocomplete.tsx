import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TypedArrray from 'utils/TypedArrray';

interface Value<T> {
  key: string | number;
  label: string;
  subLabel?: string;
  value: T;
  disabled: boolean;
}

interface Props<O extends FieldValues, V extends string | number>
  extends Omit<TextFieldProps, 'name' | 'onSelect'> {
  name: string;
  options: O[];
  renderLabel?: (option: O) => string;
  renderSubLabel?: (option: O) => string;
  renderValue?: (option: O) => V;
  getOptionDisabled?: (option: O) => boolean;
  onSelect?: (value: V) => void;
  placeholder: string;
  actionText?: string; // Like placeholder, but for instruction
}

const ProFormMultipleAutocomplete = <
  O extends FieldValues,
  V extends string | number
>(
  props: Props<O, V>
) => {
  const {
    name,
    label,
    options,
    renderLabel = (option) => option.label,
    renderValue = (option) => option.value,
    renderSubLabel,
    disabled,
    placeholder,
    actionText,
    getOptionDisabled,
    onSelect,
    required,
    ...rest
  } = props;

  const { t } = useTranslation();

  const { control, setValue } = useFormContext();

  const {
    field: { value, onChange, ...others },
    fieldState: { error },
  } = useController({ name, control });

  const entries = options.reduce<Map<string | number, Value<V>>>(
    (acc, option, i) => {
      const value = renderValue(option);
      const label = renderLabel(option);
      const subLabel = renderSubLabel?.(option);
      const disabled = getOptionDisabled?.(option) || false;
      acc.set(value, { value, label, subLabel, disabled, key: i });
      return acc;
    },
    new Map()
  );

  const isValid =
    Array.isArray(value) && value.every((item) => entries.has(item));

  // Rollback
  useEffect(() => {
    if (isValid || value === null || TypedArrray.isEmpty(value)) {
      return;
    }
    setValue(name, []);
  }, [value, isValid, name, setValue]);

  return (
    <Autocomplete<V, true>
      id={name}
      disabled={disabled}
      multiple
      {...(disabled && {
        forcePopupIcon: false,
      })}
      ListboxProps={{
        // Each item 36px + 16px padding Top, bottom
        style: { maxHeight: 36 * 5 + 16, overflowY: 'auto' },
      }}
      options={options.map(renderValue)}
      getOptionLabel={(option) => entries.get(option)?.label || ''}
      noOptionsText={
        !options.length && !actionText ? t('Không có lựa chọn') : actionText
      }
      getOptionDisabled={(option) => entries.get(option)?.disabled || false}
      renderInput={(params) => (
        <TextField
          error={Boolean(error)}
          helperText={error?.message && t(error.message)}
          placeholder={disabled ? void 0 : placeholder}
          {...params}
          {...rest}
        />
      )}
      renderOption={(props, option) => {
        const label = entries.get(option)?.label;
        const subLabel = entries.get(option)?.subLabel;
        return (
          <Box component="li" {...props} key={option}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2">{label}</Typography>
              {subLabel && (
                <Typography variant="caption">{subLabel}</Typography>
              )}
            </Box>
          </Box>
        );
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={
              <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
                {entries.get(option)?.label}
              </Typography>
            }
            size="small"
            {...getTagProps({ index })}
          />
        ))
      }
      {...others}
      value={isValid ? value : []}
      onChange={(_event, value) => {
        onChange(value);
      }}
    />
  );
};

export default ProFormMultipleAutocomplete;
