import { Fns, FormableReduxToolkit, FormState, Values } from './defs';
import { createMetadata, validate } from './utils';

export const ReduxToolkitForm = <V extends Values>(
  values: V,
  fns: Fns<V> = {}
): FormableReduxToolkit<V> => {
  const initValues = { ...values },
    keys = Object.keys(initValues) as (keyof V)[],
    result = validate(keys, values, fns),
    metadata = createMetadata(false, false);

  const initial: FormState<V> = {
    values: initValues,
    keys,
    ...result,
    ...metadata,
  };

  const set = <S, K extends keyof V>(state: S, key: K, value: V[K]): void => {
    const castedState = state as unknown as FormState<V>; // Workaround to missing type WritableDraft from immer/redux toolkit
    castedState.values[key] = value;

    const newMetadata = createMetadata(true, castedState.confirmed);
    castedState.confirmed = newMetadata.confirmed;
    castedState.touched = newMetadata.touched;
    castedState.unconfirmed = newMetadata.unconfirmed;
    castedState.untouched = newMetadata.untouched;

    const newResult = validate(keys, castedState.values, fns);
    castedState.invalid = newResult.invalid;
    castedState.invalidCount = newResult.invalidCount;
    castedState.progress = newResult.progress;
    castedState.valid = newResult.valid;
    castedState.validCount = newResult.validCount;
    keys.forEach((key) => {
      castedState.errors[key] = newResult.errors[key];
    });
  };

  const confirm = (state: FormState<V>): void => {
    const newMetadata = createMetadata(state.touched, true);
    state.confirmed = newMetadata.confirmed;
    state.touched = newMetadata.touched;
    state.unconfirmed = newMetadata.unconfirmed;
    state.untouched = newMetadata.untouched;

    const newResult = validate(keys, state.values, fns);
    state.invalid = newResult.invalid;
    state.invalidCount = newResult.invalidCount;
    state.progress = newResult.progress;
    state.valid = newResult.valid;
    state.validCount = newResult.validCount;
    keys.forEach((key) => {
      state.errors[key] = newResult.errors[key];
    });
  };

  const reset = (state: FormState<V>): void => {
    const newMetadata = createMetadata(false, false);
    state.confirmed = newMetadata.confirmed;
    state.touched = newMetadata.touched;
    state.unconfirmed = newMetadata.unconfirmed;
    state.untouched = newMetadata.untouched;

    keys.forEach((key) => {
      state.values[key] = initValues[key];
    });

    const newResult = validate(keys, initValues, fns);
    state.invalid = newResult.invalid;
    state.invalidCount = newResult.invalidCount;
    state.progress = newResult.progress;
    state.valid = newResult.valid;
    state.validCount = newResult.validCount;
    keys.forEach((key) => {
      state.errors[key] = newResult.errors[key];
    });
  };

  return {
    initial,
    set,
    confirm,
    reset,
  };
};
