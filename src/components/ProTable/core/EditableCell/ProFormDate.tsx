import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateFormat } from 'constants/locale';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Validation from 'utils/Validation';
import type { AnySchema } from 'yup';

export interface FormDateProps {
  name: string;
  onSelect?: (date: Date | null) => void;
  TextFieldProps?: TextFieldProps;
  shouldDisableDate?: (date: Date | null) => boolean;
  DatePickerProps?: Partial<DatePickerProps<Date, Date>>;
  type?: 'start' | 'end';
  disabled?: boolean;
  validate?: AnySchema;
}

const ProFormDate = (props: FormDateProps) => {
  const {
    name,
    type = 'start',
    disabled,
    onSelect,
    TextFieldProps,
    DatePickerProps,
    shouldDisableDate,
    validate,
  } = props;

  const { t } = useTranslation();

  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: validate?.getDefault(),
    rules: { validate: Validation.validate(validate) },
  });

  const OpenPickerIcon = type === 'start' ? TodayIcon : EventIcon;

  return (
    <DatePicker
      disabled={disabled}
      inputFormat={DateFormat}
      PaperProps={{
        sx: {
          '& button.MuiPickersDay-root': {
            borderRadius: 1,
          },
          '& button.MuiPickersDay-root.Mui-disabled': {
            opacity: 0.3, // Fix later
          },
        },
      }}
      renderInput={(props) => {
        const { inputProps = {}, ...rest } = props;
        if (disabled) {
          inputProps.placeholder = void 0;
        }
        return (
          <TextField
            inputProps={inputProps}
            {...rest}
            {...TextFieldProps}
            fullWidth
            size="small"
            error={Boolean(error)}
            helperText={error?.message && t(error.message)}
            id={name}
          />
        );
      }}
      components={{
        OpenPickerIcon: disabled ? () => null : OpenPickerIcon,
      }}
      componentsProps={{
        actionBar: { actions: ['clear', 'today', 'accept'] },
      }}
      shouldDisableDate={shouldDisableDate}
      dayOfWeekFormatter={(day) => `${day}`}
      InputAdornmentProps={{
        position: 'end',
      }}
      onChange={(date: Date | null) => {
        onChange(date);
        onSelect?.(date);
      }}
      value={value}
      {...DatePickerProps}
    />
  );
};

export default ProFormDate;
