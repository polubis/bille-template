import * as reducers from './reducers';
import { epics } from './epics';
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
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

type CleanState<T> = T extends CombinedState<infer S>
  ? { [K in keyof S]: CleanState<S[K]> }
  : T;

const rootReducer = combineReducers(reducers);

type BillespaceStore = CleanState<ReturnType<typeof rootReducer>>;
type BillespaceEpic = Epic<AnyAction, AnyAction, BillespaceStore>;

const rootEpic = combineEpics(...Object.values(epics));

const epicMiddleware = createEpicMiddleware<
  AnyAction,
  AnyAction,
  ReturnType<typeof rootReducer>
>();

const store: Store<BillespaceStore> = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).prepend(epicMiddleware),
});

epicMiddleware.run(rootEpic);

type AppDispatch = typeof store.dispatch;

const useSelector: TypedUseSelectorHook<BillespaceStore> =
  useReactReduxSelector;
const useDispatch = () => useReactReduxDispatch<AppDispatch>();

export { BillespaceStore, BillespaceEpic };
export { store, useSelector, useDispatch };
