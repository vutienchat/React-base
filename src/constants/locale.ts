import type { LocalizationProviderProps } from '@mui/x-date-pickers';

export const DateFormat = 'DD/MM/YYYY';
export const DateTimeFormat = 'DD/MM/YYYY, HH:mm';

export const DatePickerLocaleText: LocalizationProviderProps['localeText'] = {
  previousMonth: 'Tháng trước',
  nextMonth: 'Tháng sau',

  // Action bar
  cancelButtonLabel: 'Hủy bỏ',
  clearButtonLabel: 'Xóa',
  okButtonLabel: 'Đóng',
  todayButtonLabel: 'Hôm nay',
};
