export interface ReducerAction<K, T> {
  type: K;
  payload?: T | Error;
}
