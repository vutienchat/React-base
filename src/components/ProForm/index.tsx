import type { PropsWithChildren } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, any>;
  onFinish?: (values: T) => Promise<void> | void;
  onError?: (errors: unknown) => Promise<void> | void;
}

const ProForm = <T extends FieldValues>(props: PropsWithChildren<Props<T>>) => {
  const { children, form, onFinish, onError } = props;

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={onFinish ? form.handleSubmit(onFinish, onError) : void 0}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default ProForm;
