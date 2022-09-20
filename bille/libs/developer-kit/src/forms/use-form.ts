import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { filter, Observable, Subject } from 'rxjs';
import { Fns, FormSubmitEvent, OnEvent, UseFormable, Values } from './defs';
import { ImmutableForm } from './immutable-form';

export const useForm = <V extends Values>(initValues: V, fns: Fns<V> = {}) => {
  const [, setCounter] = useState(0);

  const form = useRef(ImmutableForm(initValues, fns));

  const changed = useMemo(() => new Subject<OnEvent<V, keyof V>>(), []);
  const changed$ = useMemo(() => changed.asObservable(), []);

  const readedForm = form.current.read();

  const rerender = (): void => {
    setCounter((prev) => prev + 1);
  };

  const set = <K extends keyof V>(key: K, value: V[K]): void => {
    form.current.set(key, value);
    changed.next({ key, value });
    rerender();
  };

  const change = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const key = e.target.name;

    if (!key) {
      console.error('Lack of name property in input element');
      return;
    }

    if (!readedForm.keys.includes(key)) {
      console.error(
        'Unsupported property used as name attribute in input element'
      );
      return;
    }

    if (typeof readedForm.values[key] !== typeof value) {
      console.error(
        'Unsupported change detected. Are you trying to change non-string property with a string value?'
      );
      return;
    }

    set(key, value as V[keyof V]);
  };

  const confirm = (): void => {
    form.current.confirm();
    rerender();
  };

  const submit = (e: FormSubmitEvent): void => {
    e.preventDefault();
    confirm();
  };

  const reset = (): void => {
    form.current.reset();
    rerender();
  };

  const on = <K extends keyof V>(
    key: K,
    filterFn = (event: OnEvent<V, keyof V>): boolean => event.key === key
  ): Observable<OnEvent<V, K>> =>
    changed$.pipe(filter(filterFn)) as Observable<OnEvent<V, K>>;

  return {
    ...readedForm,
    set,
    confirm,
    submit,
    change,
    on,
    reset,
  } as UseFormable<V>;
};
