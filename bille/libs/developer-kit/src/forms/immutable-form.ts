import { Fns, Formable, Values } from './defs';
import { createMetadata, validate } from './utils';

export const ImmutableForm = <V extends Values>(
  values: V,
  fns: Fns<V> = {}
): Formable<V> => {
  const initValues = values;
  const keys = Object.keys(initValues) as (keyof V)[];
  let result = validate(keys, values, fns),
    metadata = createMetadata(false, false);

  return {
    set: <K extends keyof V>(key: K, value: V[K]): void => {
      values = {
        ...values,
        [key]: value,
      };
      result = validate(keys, values, fns);
      metadata = createMetadata(true, metadata.confirmed);
    },
    confirm: (): void => {
      result = validate(keys, values, fns);
      metadata = createMetadata(metadata.touched, true);
    },
    reset: (): void => {
      result = validate(keys, initValues, fns);
      metadata = createMetadata(false, false);
      values = initValues;
    },
    read: () => ({
      keys,
      values,
      ...result,
      ...metadata,
    }),
  };
};
