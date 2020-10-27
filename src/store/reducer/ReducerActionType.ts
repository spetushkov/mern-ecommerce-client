export const ReducerActionType = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};

export const ReducerAsyncActionType = {
  LOAD: 'LOAD',
  ...ReducerActionType,
};
