import { createSelector } from '@reduxjs/toolkit';
import { BillespaceState } from '../store';
import { getSetableState } from './guards';

const selectReducer = (state: BillespaceState) => state.officeManagementReducer;

export const selectOfficeManagementForm = createSelector(
  selectReducer,
  (reducer) => getSetableState(reducer).form
);

export const selectOfficeManagementStage = createSelector(
  selectReducer,
  ({ current }) => current.stage
);
