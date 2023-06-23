export type PickUnion<T> = { [K in keyof T]: Pick<T, K> }[keyof T];
