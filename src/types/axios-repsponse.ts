export type AxiosResponse<T> = {
  success: boolean;
  code: number;
  message: string;
  payload: T;
};
