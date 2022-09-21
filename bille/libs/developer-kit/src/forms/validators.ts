export const run = (invalid: boolean, message: string): string =>
  invalid ? message : '';

export const required =
  (message = (value: string) => 'This field is required') =>
  (value: string) =>
    run(value === '', message(value));

export const minLength =
  (
    limit: number,
    message = (limit: number, value: string) => `Minimum length is ${limit}`
  ) =>
  (value: string) =>
    run(value.length > 0 && value.length < limit, message(limit, value));

export const maxLength =
  (
    limit: number,
    message = (limit: number, value: string) => `Maximum length is ${limit}`
  ) =>
  (value: string) =>
    run(value.length > 0 && value.length > limit, message(limit, value));

export const email =
  (message = () => 'Invalid email format') =>
  (value: string) =>
    run(
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value.toLowerCase()
      ),
      message()
    );

export const address =
  (message = () => 'Invalid address format') =>
  (value: string) =>
    run(!/^[a-zA-Z0-9\s,'-]*$/.test(value), message());

export const notEmpty =
  (message = () => 'Atleast one item is required') =>
  (value: unknown[]) =>
    run(value.length === 0, message());

export const inRange =
  (
    min: number,
    max: number,
    key: string,
    message = (min: number, max: number) =>
      `Value must be between ${min} and ${max}`
  ) =>
  (items: Record<string, any>[]) =>
    run(
      items.some((item) => item[key] < min || item[key] > max),
      message(min, max)
    );

export const image =
  (message = () => 'File must be an image') =>
  (file: File) =>
    run(!/image/.test(file.type), message());

export const unique =
  (key: string, message = () => 'Zone names need to be unique') =>
  (array: Record<string, any>[]) =>
    run(
      new Set(array.map((element) => element[key])).size !== array.length,
      message()
    );
