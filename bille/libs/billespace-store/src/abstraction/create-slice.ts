import {
  createSlice as toolkitCreateSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

export const createSlice = <
  N extends string,
  S,
  R extends SliceCaseReducers<S>
>(
  name: N,
  initialState: S,
  reducers: ValidateSliceCaseReducers<S, R>
) => {
  const slice = toolkitCreateSlice({
    name,
    initialState,
    reducers,
  });

  return [slice.reducer, slice.actions] as const;
};
