export interface ResponseModelType<T> {
  code: number;
  data: T;
  message: string;
}
