import { ReducerAction } from './ReducerAction';

export const ReducerActionCreator = <T, P>() => {
  return (type: T, payload?: P): ReducerAction<T, P> => {
    return { type, payload };
  };
};
