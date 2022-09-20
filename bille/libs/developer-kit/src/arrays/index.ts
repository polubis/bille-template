export const add = <T>(items: T[], item: T): T[] => [...items, item];

export const remove = <T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
): T[] => items.filter((item) => item[key] !== value);

export const update = <T, K extends keyof T>(
  items: T[],
  key: K,
  value: T
): T[] =>
  items.map((item) =>
    item[key] === value[key] ? { ...item, ...value } : item
  );

export const sum = <T, K extends keyof T>(items: T[], key: K): number =>
  items.reduce((acc, item) => +item[key] + acc, 0);
