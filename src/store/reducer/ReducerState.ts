export interface ReducerState<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}
