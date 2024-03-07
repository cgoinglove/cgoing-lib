type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type PartialByKeys<T extends Record<string, any>, K extends keyof T> = Omit<
  T,
  K
> &
  Partial<Pick<T, K>>;

type Func<Args extends any[] = any[], ReturnValue = any> = (
  ...args: Args
) => ReturnValue;

type ElementType<T> = T extends (infer U)[] ? U : never;

type ValueOf<T extends object> = T[keyof T];
