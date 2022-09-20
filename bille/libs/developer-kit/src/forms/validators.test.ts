import {
  address,
  email,
  inRange,
  maxLength,
  minLength,
  required,
} from './validators';

describe('required()', () => {
  it('returns message as validation result', () => {
    expect(required(() => 'This field cannot be empty')('')).toBe(
      'This field cannot be empty'
    );
    expect(required(() => 'This field cannot be empty')('d')).toBe('');
  });
});

describe('minLength()', () => {
  it('returns message as validation result', () => {
    expect(minLength(5, () => 'Min length is 5')('dddd')).toBe(
      'Min length is 5'
    );
    expect(minLength(5, () => 'Min length is 5')('ddddd')).toBe('');
    expect(minLength(5, () => 'Min length is 5')('')).toBe('');
  });
});

describe('maxLength()', () => {
  it('returns message as validation result', () => {
    expect(maxLength(5, () => 'Max length is 5')('dddddd')).toBe(
      'Max length is 5'
    );
    expect(maxLength(5, () => 'Max length is 5')('ddddd')).toBe('');
    expect(maxLength(5, () => 'Max length is 5')('')).toBe('');
  });
});

describe('email()', () => {
  it('returns message as validation result', () => {
    expect(email(() => 'Email invalid')('dddddd')).toBe('Email invalid');
    expect(email(() => 'Email invalid')('pablo@wp.pl')).toBe('');
  });
});

describe('address()', () => {
  it('returns message as validation result', () => {
    const VALID_VALUES = ['1 Almaden Boulevard', '999 Peachtree Street NE'];
    const INVALID_VALUES = ['1 Almaden Boulevar9///'];

    VALID_VALUES.forEach((value) => {
      expect(address(() => 'Address invalid')(value)).toBe('');
    });
    INVALID_VALUES.forEach((value) => {
      expect(address(() => 'Address invalid')(value)).toBe('Address invalid');
    });
  });
});

describe('inRange()', () => {
  it('returns message as validation result', () => {
    const VALID_VALUES = [
      {
        value: 5,
      },
      {
        value: 10,
      },
    ];

    const INVALID_VALUES = [
      {
        value: 4,
      },
      {
        value: 11,
      },
    ];

    expect(
      inRange(
        5,
        10,
        'value',
        () => 'Value must be between 5 and 10'
      )(VALID_VALUES)
    ).toBe('');

    expect(
      inRange(
        5,
        10,
        'value',
        () => 'Value must be between 5 and 10'
      )(INVALID_VALUES)
    ).toBe('Value must be between 5 and 10');
  });
});
