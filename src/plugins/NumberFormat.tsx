import type { ChangeEvent, HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';

// Override for compatibility with NumberFormat
interface Props extends HTMLAttributes<HTMLInputElement> {
  name?: string & any;
  defaultValue?: string & any;
}

export const NumberInput = forwardRef<HTMLAttributes<HTMLInputElement>, Props>(
  (props, ref) => {
    const { onChange, name, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={({ value }) => {
          onChange?.({
            target: { name: name, value: value },
          } as ChangeEvent<HTMLInputElement>);
        }}
        decimalScale={0}
        thousandSeparator={false}
        allowLeadingZeros
        allowNegative={false}
        valueIsNumericString
      />
    );
  }
);

export const SalaryInput = forwardRef<HTMLAttributes<HTMLInputElement>, Props>(
  (props, ref) => {
    const { onChange, name, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={({ value }) => {
          onChange?.({
            target: { name: name, value: value },
          } as ChangeEvent<HTMLInputElement>);
        }}
        decimalScale={0}
        decimalSeparator=","
        thousandSeparator="."
        valueIsNumericString
      />
    );
  }
);

export const WeightInput = forwardRef<HTMLAttributes<HTMLInputElement>, Props>(
  (props, ref) => {
    const { onChange, name, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={({ value }) => {
          onChange?.({
            target: { name: name, value: value },
          } as ChangeEvent<HTMLInputElement>);
        }}
        decimalScale={2}
        decimalSeparator="."
        valueIsNumericString
      />
    );
  }
);

export const PriceInput = forwardRef<HTMLAttributes<HTMLInputElement>, Props>(
  (props, ref) => {
    const { onChange, name, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={({ value }) => {
          onChange?.({
            target: { name: name, value: value },
          } as ChangeEvent<HTMLInputElement>);
        }}
        decimalScale={0}
        decimalSeparator=","
        thousandSeparator="."
        valueIsNumericString
      />
    );
  }
);
