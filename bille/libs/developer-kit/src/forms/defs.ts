import { ChangeEvent } from 'react';
import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Values = Record<string, any>;
export type Fn<V extends Values, T> = (value: T, values: V) => string;
export type Fns<V extends Values> = {
  [K in keyof V]?: Fn<V, V[K]>[];
};
export type Errors<V extends Values> = {
  [K in keyof V]: string;
};
export interface ValidationResult<V extends Values> {
  invalid: boolean;
  valid: boolean;
  errors: Errors<V>;
  validCount: number;
  progress: number;
  invalidCount: number;
}
export interface Metadata {
  touched: boolean;
  untouched: boolean;
  confirmed: boolean;
  unconfirmed: boolean;
}
export interface OnEvent<V extends Values, K extends keyof V> {
  key: K;
  value: V[K];
}
export type FormSubmitEvent = { preventDefault: () => void };

export interface FormState<V extends Values>
  extends ValidationResult<V>,
    Metadata {
  keys: (keyof V)[];
  values: V;
}

export interface Formable<V extends Values> {
  confirm(): void;
  reset(): void;
  set<K extends keyof V>(key: K, value: V[K]): void;
  read(): FormState<V>;
}

export interface FormableReduxToolkit<V extends Values> {
  initial: FormState<V>;
  set<S, K extends keyof V>(state: S, key: K, value: V[K]): void;
  confirm(state: FormState<V>): void;
  reset(state: FormState<V>): void;
}

export type UseFormable<V extends Values> = FormState<V> &
  Omit<Formable<V>, 'read'> & {
    submit(e: FormSubmitEvent): void;
    change(e: ChangeEvent<HTMLInputElement>): void;
    on<K extends keyof V>(
      key: K,
      filterFn?: (event: OnEvent<V, keyof V>) => boolean
    ): Observable<OnEvent<V, K>>;
  };
