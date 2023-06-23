import type { PropsWithChildren } from 'react';
import { Fragment } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

interface Props<T extends FieldValues> {
  form?: UseFormReturn<T, any>;
}

const ProFormProvider = <T extends FieldValues>(
  props: PropsWithChildren<Props<T>>
) => {
  const { children, form } = props;

  if (form) {
    return <FormProvider {...form}>{children}</FormProvider>;
  }

  return <Fragment>{children}</Fragment>;
};

export default ProFormProvider;
