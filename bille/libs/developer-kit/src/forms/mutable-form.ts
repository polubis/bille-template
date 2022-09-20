import { Fns, Formable, Values } from './defs';
import { createMetadata, validate } from './utils';

export const MutableForm = <V extends Values>(
  values: V,
  fns: Fns<V> = {}
): Formable<V> => {
  const initValues = { ...values },
    keys = Object.keys(initValues) as (keyof V)[],
    result = validate(keys, values, fns),
    metadata = createMetadata(false, false);

  return {
    set: <K extends keyof V>(key: K, value: V[K]): void => {
      values[key] = value;

      const newMetadata = createMetadata(true, metadata.confirmed);
      metadata.confirmed = newMetadata.confirmed;
      metadata.touched = newMetadata.touched;
      metadata.unconfirmed = newMetadata.unconfirmed;
      metadata.untouched = newMetadata.untouched;

      const newResult = validate(keys, values, fns);
      result.invalid = newResult.invalid;
      result.invalidCount = newResult.invalidCount;
      result.progress = newResult.progress;
      result.valid = newResult.valid;
      result.validCount = newResult.validCount;
      keys.forEach((key) => {
        result.errors[key] = newResult.errors[key];
      });
    },
    confirm: (): void => {
      const newMetadata = createMetadata(metadata.touched, true);
      metadata.confirmed = newMetadata.confirmed;
      metadata.touched = newMetadata.touched;
      metadata.unconfirmed = newMetadata.unconfirmed;
      metadata.untouched = newMetadata.untouched;

      const newResult = validate(keys, values, fns);

      result.invalid = newResult.invalid;
      result.invalidCount = newResult.invalidCount;
      result.progress = newResult.progress;
      result.valid = newResult.valid;
      result.validCount = newResult.validCount;
      keys.forEach((key) => {
        result.errors[key] = newResult.errors[key];
      });
    },
    reset: (): void => {
      const newMetadata = createMetadata(false, false);
      metadata.confirmed = newMetadata.confirmed;
      metadata.touched = newMetadata.touched;
      metadata.unconfirmed = newMetadata.unconfirmed;
      metadata.untouched = newMetadata.untouched;

      keys.forEach((key) => {
        values[key] = initValues[key];
      });

      const newResult = validate(keys, initValues, fns);
      result.invalid = newResult.invalid;
      result.invalidCount = newResult.invalidCount;
      result.progress = newResult.progress;
      result.valid = newResult.valid;
      result.validCount = newResult.validCount;
      keys.forEach((key) => {
        result.errors[key] = newResult.errors[key];
      });
    },
    read: () => ({
      keys,
      values,
      ...result,
      ...metadata,
    }),
  };
};
