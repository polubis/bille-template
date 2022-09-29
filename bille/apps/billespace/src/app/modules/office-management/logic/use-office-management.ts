/* eslint-disable react-hooks/exhaustive-deps */
import {
  OfficePayload,
  OfficeZone,
  ParkingZone,
} from '@bille/billespace-services';
import { add, id, remove, update } from '@bille/developer-kit';
import { useState, useMemo, useEffect } from 'react';
import { catchError, EMPTY, Subject, switchMap, tap, zip } from 'rxjs';
import { createOfficeForm, MIN_DESKS_COUNT, MIN_SPACES_COUNT } from './config';
import { OfficeId, OfficeManagementState } from './models';
import {
  createOffice,
  editOffice,
  loadCountries,
  loadOffice,
} from './services';

const getManagableState = (state: OfficeManagementState) => {
  if (state.stage === 'CREATION' || state.stage === 'EDITION') {
    return { ...state };
  }

  throw new Error('Trying to set when form is unvailable');
};

export const useOfficeManagement = () => {
  const [state, setState] = useState<OfficeManagementState>({ stage: 'IDLE' });

  const finishAction = useMemo(() => new Subject<OfficeId>(), []);
  const finishAction$ = useMemo(() => finishAction.asObservable(), []);

  const prepareAction = useMemo(() => new Subject<OfficeId>(), []);
  const prepareAction$ = useMemo(() => prepareAction.asObservable(), []);

  const addOfficeZone = (name: OfficeZone['name']) => {
    const safeState = getManagableState(state);
    safeState.form.set(
      'officeZones',
      add(safeState.form.read().values.officeZones, {
        name,
        id: id(),
        desks: MIN_DESKS_COUNT,
      })
    );

    setState(safeState);
  };

  const updateOfficeZone = (officeZone: OfficeZone) => {
    const safeState = getManagableState(state);
    safeState.form.set(
      'officeZones',
      update(safeState.form.read().values.officeZones, 'id', officeZone)
    );

    setState(safeState);
  };

  const deleteOfficeZone = (id: OfficeZone['id']) => {
    const safeState = getManagableState(state);
    safeState.form.set(
      'officeZones',
      remove(safeState.form.read().values.officeZones, 'id', id)
    );

    setState(safeState);
  };

  const addParkingZone = (name: ParkingZone['name']) => {
    const safeState = getManagableState(state);
    safeState.form.set(
      'parkingZones',
      add(safeState.form.read().values.parkingZones, {
        name,
        id: id(),
        spaces: MIN_SPACES_COUNT,
      })
    );

    setState(safeState);
  };

  const updateParkingZone = (parkingZone: ParkingZone) => {
    const safeState = getManagableState(state);
    safeState.form.set(
      'parkingZones',
      update(safeState.form.read().values.parkingZones, 'id', parkingZone)
    );

    setState(safeState);
  };

  const deleteParkingZone = (id: ParkingZone['id']) => {
    const safeState = getManagableState(state);
    safeState.form.set(
      'parkingZones',
      remove(safeState.form.read().values.parkingZones, 'id', id)
    );

    setState(safeState);
  };

  const set = <K extends keyof OfficePayload>(
    key: K,
    value: OfficePayload[K]
  ) => {
    const safeState = getManagableState(state);
    safeState.form.set(key, value);

    if (key === 'countryId') {
      safeState.form.set('cityId', '');
    }

    setState(safeState);
  };

  const prepare = (officeId: OfficeId) => {
    prepareAction.next(officeId);
  };

  useEffect(() => {
    const sub = prepareAction$
      .pipe(
        tap(() => {
          setState({ stage: 'PREPARING' });
        }),
        switchMap((officeId) => {
          if (officeId === undefined) {
            return loadCountries().pipe(
              tap(({ data: countries }) => {
                setState({
                  stage: 'CREATION',
                  countries,
                  form: createOfficeForm(),
                });
              }),
              catchError(() => {
                setState({ stage: 'PREPARE_FAILED' });
                return EMPTY;
              })
            );
          }

          return zip(loadCountries(), loadOffice()).pipe(
            tap(([{ data: countries }, { data: office }]) => {
              setState({
                stage: 'EDITION',
                office,
                countries,
                form: createOfficeForm({
                  cityId: office.city.id,
                  countryId: office.country.id,
                  address: office.address,
                  officeZones: office.officeZones,
                  parkingZones: office.parkingZones,
                  postCode: office.postCode,
                }),
              });
            }),
            catchError(() => {
              setState({ stage: 'PREPARE_FAILED' });
              return EMPTY;
            })
          );
        })
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  const finish = (officeId: OfficeId) => {
    finishAction.next(officeId);
  };

  useEffect(() => {
    const sub = finishAction$
      .pipe(
        tap((officeId) => {
          setState({
            stage: officeId === undefined ? 'CREATING' : 'EDITING',
          });
        }),
        switchMap((officeId) => {
          if (officeId === undefined) {
            return createOffice().pipe(
              tap(() => {
                setState({
                  stage: 'CREATED',
                });
              }),
              catchError(() => {
                setState({ stage: 'CREATE_FAILED' });
                return EMPTY;
              })
            );
          }

          return editOffice().pipe(
            tap(() => {
              setState({
                stage: 'EDITED',
              });
            }),
            catchError(() => {
              setState({ stage: 'EDIT_FAILED' });
              return EMPTY;
            })
          );
        })
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  const actions = {
    prepare,
    set,
    addOfficeZone,
    updateOfficeZone,
    deleteOfficeZone,
    addParkingZone,
    updateParkingZone,
    deleteParkingZone,
    finish,
  };

  if (state.stage === 'CREATION' || state.stage === 'EDITION') {
    return {
      ...actions,
      state: {
        ...state,
        form: state.form.read(),
      },
    };
  }

  return {
    ...actions,
    state,
  };
};
