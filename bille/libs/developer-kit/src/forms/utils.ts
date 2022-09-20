import { Errors, Fns, Metadata, ValidationResult, Values } from './defs';

export const createMetadata = (
  touched: boolean,
  confirmed: boolean
): Metadata => ({
  touched,
  untouched: !touched,
  confirmed,
  unconfirmed: !confirmed,
});

export const validate = <V extends Values>(
  keys: (keyof V)[],
  values: V,
  fns: Fns<V>
): ValidationResult<V> => {
  let invalid = false,
    invalidCount = 0;

  const errors = {} as Errors<V>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const safeFns = fns[key] ?? [];
    const value = values[key];
    errors[key] = '';

    for (let j = 0; j < safeFns.length; j++) {
      const fn = safeFns[j];
      const error = fn(value, values);

      if (error !== '') {
        invalid = true;
        errors[key] = error;
        invalidCount++;
        break;
      }
    }
  }

  const validCount = keys.length - invalidCount;

  return {
    invalid,
    errors,
    valid: !invalid,
    validCount,
    progress: +((validCount / keys.length) * 100).toFixed(2),
    invalidCount,
  };
};
