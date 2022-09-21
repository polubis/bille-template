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
import { officeManagementActions } from './slice';

// Mocks added only for showcase - you can remove them and mock it on msw layer.
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
    filter(officeManagementActions.prepare.match),
    switchMap(({ payload: officeId }) => {
      if (officeId === undefined) {
        return loadCountries.mock(COUNTRIES).pipe(
          map(({ data: countries }) =>
            officeManagementActions.creation({
              countries,
            })
          ),
          catchError(() => of(officeManagementActions.prepareFailed()))
        );
      }

      return zip(loadCountries.mock(COUNTRIES), loadOffice.mock(OFFICE)).pipe(
        map(([{ data: countries }, { data: office }]) =>
          officeManagementActions.edition({
            countries,
            office,
          })
        ),
        catchError(() => of(officeManagementActions.prepareFailed()))
      );
    })
  );

export const finishOfficeManagement: BillespaceEpic = (action$) =>
  action$.pipe(
    filter(officeManagementActions.finish.match),
    switchMap(({ payload: officeId }) => {
      let obs$ = editOffice.mock(OFFICE).pipe(
        map(() => officeManagementActions.edited()),
        catchError(() => of(officeManagementActions.editFailed()))
      );

      if (officeId === undefined) {
        obs$ = createOffice.mock(OFFICE).pipe(
          map(() => officeManagementActions.created()),
          catchError(() => of(officeManagementActions.createFailed()))
        );
      }

      return concat(
        of(
          officeId === undefined
            ? officeManagementActions.creating()
            : officeManagementActions.editing()
        ),
        obs$
      );
    })
  );
