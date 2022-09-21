import { OfficeManagementReducerState } from '../models';
import {
  officeManagementActions,
  officeManagementReducer,
  INITIAL_STATE,
} from '../slice';

describe('office management reducer', () => {
  it('has correct initial state', () => {
    expect(officeManagementReducer(undefined, { type: undefined })).toEqual(
      INITIAL_STATE
    );
  });

  it('preparing', () => {
    const prevState = { ...INITIAL_STATE };

    expect(
      officeManagementReducer(prevState, officeManagementActions.prepare())
    ).toEqual({
      current: { stage: 'PREPARING' },
    } as OfficeManagementReducerState);
  });

  it('handles preparation fail', () => {
    const prevState: OfficeManagementReducerState = {
      current: { stage: 'PREPARING' },
    };

    expect(
      officeManagementReducer(prevState, officeManagementActions.prepareFailed())
    ).toEqual({
      current: { stage: 'PREPARE_FAILED' },
    } as OfficeManagementReducerState);
  });
});
