/* eslint-disable @typescript-eslint/no-empty-function */
import { FormState } from './defs';
import { ReduxToolkitForm } from './redux-toolkit-form';

describe('ReduxToolkitForm()', () => {
  it('manages form data', () => {
    const VALUES = { username: '', password: '' };
    const { initial, set, confirm, reset } = ReduxToolkitForm(VALUES, {
      username: [(value) => (value === '' ? 'Invalid' : '')],
    });

    const state = initial;

    expect(initial).toEqual(<FormState<typeof VALUES>>{
      errors: {
        username: 'Invalid',
        password: '',
      },
      keys: Object.keys(VALUES),
      values: VALUES,
      validCount: 1,
      invalidCount: 1,
      progress: 50,
      invalid: true,
      valid: false,
      touched: false,
      untouched: true,
      confirmed: false,
      unconfirmed: true,
    });

    set(state, 'username', 'jacob');

    expect(state).toEqual(<FormState<typeof VALUES>>{
      errors: {
        username: '',
        password: '',
      },
      keys: Object.keys(VALUES),
      values: {
        username: 'jacob',
        password: '',
      },
      validCount: 2,
      invalidCount: 0,
      progress: 100,
      invalid: false,
      valid: true,
      touched: true,
      untouched: false,
      confirmed: false,
      unconfirmed: true,
    });

    set(state, 'username', '');
    confirm(state);

    expect(state).toEqual(<FormState<typeof VALUES>>{
      errors: {
        username: 'Invalid',
        password: '',
      },
      keys: Object.keys(VALUES),
      values: {
        username: '',
        password: '',
      },
      validCount: 1,
      invalidCount: 1,
      progress: 50,
      invalid: true,
      valid: false,
      touched: true,
      untouched: false,
      confirmed: true,
      unconfirmed: false,
    });

    reset(state);

    expect(initial).toEqual(<FormState<typeof VALUES>>{
      errors: {
        username: 'Invalid',
        password: '',
      },
      keys: Object.keys(VALUES),
      values: VALUES,
      validCount: 1,
      invalidCount: 1,
      progress: 50,
      invalid: true,
      valid: false,
      touched: false,
      untouched: true,
      confirmed: false,
      unconfirmed: true,
    });
  });
});
