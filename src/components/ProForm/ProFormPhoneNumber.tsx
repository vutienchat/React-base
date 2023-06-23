import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type {
  AutocompleteChangeReason,
  AutocompleteCloseReason,
} from '@mui/material/Autocomplete';
import Autocomplete, {
  autocompleteClasses,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Image from 'components/ProComponents/Image';
import { DEFAULT_PHONE_CODE } from 'constants/country';
import useScrollbar from 'hooks/useScrollbar';
import { PhoneInput } from 'plugins/PatternFormat';
import useCountries from 'queries/useCountries';
import type { SyntheticEvent } from 'react';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Country } from 'types/country';
import ProFormTextField from './ProFormTextField';

interface Props {
  code?: string;
  phone?: string;
  disabled?: boolean;
}

const ProFormPhoneNumber = (props: Props) => {
  const { code = 'phoneCode', phone = 'phoneNumber', disabled } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const scrollbar = useScrollbar();

  const { countries } = useCountries();

  const { setValue, getValues } = useFormContext();

  const value = getValues(code);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (
    _event: SyntheticEvent,
    value: string,
    reason: AutocompleteChangeReason
  ) => {
    setValue(code, value);
    if (reason === 'selectOption') {
      handleClose();
    }
  };

  const handleClosePopup = (
    _event: SyntheticEvent,
    reason: AutocompleteCloseReason
  ) => {
    if (reason === 'escape') {
      handleClose();
    }
  };

  const entries = countries.reduce<Map<string, Country>>((acc, country) => {
    const { phoneCode } = country;
    acc.set(phoneCode, country);
    return acc;
  }, new Map());

  const filterOptions = useMemo(
    () =>
      createFilterOptions({
        matchFrom: 'any',
        stringify: (option: string) => {
          const country = entries.get(option);
          if (country) {
            return `${country.countryName}${country.countryCodeISO2}${country.phoneCode}`;
          }
          return option;
        },
      }),
    [entries]
  );

  // Rollback
  useEffect(() => {
    if (entries.has(value)) return;
    setValue(code, DEFAULT_PHONE_CODE);
  }, [value, entries, code, setValue]);

  return (
    <Fragment>
      <Box ref={ref}>
        <ProFormTextField
          disabled={disabled}
          name={phone}
          InputProps={{
            inputComponent: PhoneInput,
            startAdornment: (
              <InputAdornment position="start">
                <ButtonBase onClick={handleClick} disabled={disabled}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      loading="lazy"
                      sx={{ width: 20, mr: 1, flexShrink: 0 }}
                      src={entries.get(value)?.flag}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ color: 'text.primary' }}
                    >
                      {entries.get(value)?.phoneCode}
                    </Typography>
                    {!disabled && <ArrowDropDownIcon />}
                  </Box>
                </ButtonBase>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Popover
        anchorEl={ref.current}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 12,
          sx: { mt: 1, width: 300 },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Autocomplete
          open
          disableClearable
          disableCloseOnSelect
          disabledItemsFocusable
          onClose={handleClosePopup}
          options={Array.from(entries.keys())}
          getOptionLabel={(option) => entries.get(option)?.countryName || ''}
          filterOptions={filterOptions}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          PopperComponent={PopperComponent}
          renderTags={() => null}
          forcePopupIcon={false}
          componentsProps={{
            paper: {
              elevation: 0,
              sx: { bgcolor: 'transparent', ...scrollbar },
            },
          }}
          renderOption={(props, option) => {
            const label = entries.get(option)?.countryName;
            const code = entries.get(option)?.countryCodeISO2;
            const phone = entries.get(option)?.phoneCode;
            const flagUrl = entries.get(option)?.flag;
            return (
              <Box component="li" {...props}>
                <Image
                  loading="lazy"
                  sx={{ width: 20, mr: 2, flexShrink: 0 }}
                  src={flagUrl}
                  alt={label}
                />
                <Typography variant="subtitle2">
                  {label} ({code}){' '}
                  <Typography variant="caption">{phone}</Typography>
                </Typography>
              </Box>
            );
          }}
          renderInput={(params) => (
            <Box ref={params.InputProps.ref} sx={{ p: 1, pt: 1.5 }}>
              <TextField
                autoFocus
                inputProps={params.inputProps}
                label="Mã vùng"
                placeholder="Tìm kiếm"
              />
            </Box>
          )}
        />
      </Popover>
    </Fragment>
  );
};

// Popper
const AutocompletePopper = styled('div')({
  [`& .${autocompleteClasses.listbox}`]: {
    paddingTop: 0,
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
});

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}
const PopperComponent = (props: PopperComponentProps) => {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <AutocompletePopper {...other} />;
};

export default ProFormPhoneNumber;
