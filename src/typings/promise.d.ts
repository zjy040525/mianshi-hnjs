export type PromiseType<T> = Promise<{
  code: number;
  data: T;
  message: string;
}>;
