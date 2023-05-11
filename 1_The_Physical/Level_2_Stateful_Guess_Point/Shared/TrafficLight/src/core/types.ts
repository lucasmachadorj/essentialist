export interface Collection<T> {
  add(item: T): void;
  count(): number;
  getItems(): T[];
}

export type Seconds = number;
