declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export type FCC<T = {}> = React.FC<React.PropsWithChildren<T>>;
export type ChangeEvent<T = HTMLInputElement> = React.ChangeEventHandler<T>;
export type MouseEvent<T = HTMLButtonElement> = React.MouseEventHandler<T>;
export type ClickEvent<T = HTMLButtonElement> = React.MouseEventHandler<T>;
