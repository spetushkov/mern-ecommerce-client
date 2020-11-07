import { Clazz } from '../class/ClassTransformer';

export interface Storage<T> {
  key: string;

  find(entityClass: Clazz<T>): T | null;
  save(data: T): void;
  remove(): void;
}
