import {
  Country,
  createOffice,
  editOffice,
  loadCountries,
  loadOffice,
  Office,
} from '@bille/billespace-services';
import { filter, of, map, switchMap, catchError, zip, concat } from 'rxjs';
import { BillespaceEpic } from '../store';
import { officeManagementAllActions } from './slice';

const COUNTRIES: Country[] = [
  {
    id: '0',
    name: 'Poland',
    symbol: 'PL',
    cities: [{ id: '0', name: 'Warsaw' }],
  },
  {
    id: '1',
    name: 'England',
    symbol: 'UK',
    cities: [{ id: '1', name: 'London' }],
  },
  {
    id: '2',
    name: 'USA',
    symbol: 'US',
    cities: [{ id: '2', name: 'California' }],
  },
];
const OFFICE: Office = {
  id: '0',
  address: 'Pileckiego',
  postCode: '123',
  parkingZones: [{ id: '0', name: 'A', spaces: 10 }],
  officeZones: [{ id: '0', name: 'A', desks: 10 }],
  country: COUNTRIES[0],
  city: COUNTRIES[0].cities[0],
};

export const prepareOfficeManagement: BillespaceEpic = (action$) =>
  action$.pipe(
    filter(officeManagementAllActions.prepare.match),
    switchMap(({ payload: officeId }) => {
      if (officeId === undefined) {
        return loadCountries.mock(COUNTRIES).pipe(
          map(({ data: countries }) =>
            officeManagementAllActions.creation({
              countries,
            })
          ),
          catchError(() => of(officeManagementAllActions.prepareFailed()))
        );
      }

      return zip(loadCountries.mock(COUNTRIES), loadOffice.mock(OFFICE)).pipe(
        map(([{ data: countries }, { data: office }]) =>
          officeManagementAllActions.edition({
            countries,
            office,
          })
        ),
        catchError(() => of(officeManagementAllActions.prepareFailed()))
      );
    })
  );

export const finishOfficeManagement: BillespaceEpic = (action$) =>
  action$.pipe(
    filter(officeManagementAllActions.finish.match),
    switchMap(({ payload: officeId }) => {
      let obs$ = editOffice.mock(OFFICE).pipe(
        map(() => officeManagementAllActions.edited()),
        catchError(() => of(officeManagementAllActions.editFailed()))
      );

      if (officeId === undefined) {
        obs$ = createOffice.mock(OFFICE).pipe(
          map(() => officeManagementAllActions.created()),
          catchError(() => of(officeManagementAllActions.createFailed()))
        );
      }

      return concat(
        of(
          officeId === undefined
            ? officeManagementAllActions.creating()
            : officeManagementAllActions.editing()
        ),
        obs$
      );
    })
  );
