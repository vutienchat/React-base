import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface Props {
  fields: string[];
  children: (values: Record<string, any>) => ReactNode;
}

const ProFormDependency = (props: Props) => {
  const { fields, children } = props;

  const { control, getValues } = useFormContext();

  const watched = useWatch({
    control,
    name: fields,
  });

  const latest = getValues(fields);

  const values = fields.reduce<Record<string, any>>((acc, field, i) => {
    acc[field] = watched[i];
    acc[field] = latest[i];
    return acc;
  }, {});

  return <Fragment>{children(values)}</Fragment>;
};

export default ProFormDependency;
