import * as reducers from './reducers';
import {
  configureStore,
  AnyAction,
  combineReducers,
  CombinedState,
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useReactReduxDispatch,
  useSelector as useReactReduxSelector,
} from 'react-redux';
import { Store } from 'redux';
import { Epic } from 'redux-observable';

type CleanState<T> = T extends CombinedState<infer S>
  ? { [K in keyof S]: CleanState<S[K]> }
  : T;

const rootReducer = combineReducers(reducers);

type BillespaceState = CleanState<ReturnType<typeof rootReducer>>;
type BillespaceEpic = Epic<AnyAction, AnyAction, BillespaceState>;

const store: Store<BillespaceState> = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

type AppDispatch = typeof store.dispatch;
type BillespaceStore = typeof store;

const useSelector: TypedUseSelectorHook<BillespaceState> =
  useReactReduxSelector;
const useDispatch = () => useReactReduxDispatch<AppDispatch>();

export { BillespaceState, BillespaceEpic, BillespaceStore };
export { store, useSelector, useDispatch };