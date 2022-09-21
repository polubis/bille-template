import { initial } from '../config';
import { getSetableState, getSafeValue } from '../guards';

describe('getSafeValue()', () => {
  it('throws for undefined', () => {
    expect(() => getSafeValue(undefined)).toThrow(Error);
  });
});

describe('getSetableState()', () => {
  it('throws for stage different than "EDITION" and "CREATION"', () => {
    expect(() => getSetableState({ current: { stage: 'IDLE' } })).toThrow(
      Error
    );
    expect(() =>
      getSetableState({
        current: { stage: 'CREATION', countries: [], form: initial },
      })
    ).not.toThrow(Error);
  });
});
