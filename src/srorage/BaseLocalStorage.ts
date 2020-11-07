import { ClassTransformer, Clazz } from '../class/ClassTransformer';
import { Storage } from './Storage';

export class BaseLocalStorage<T> implements Storage<T> {
  readonly key: string;
  private entityClass: Clazz<T>;

  constructor(key: string, entityClass: Clazz<T>) {
    this.key = key;
    this.entityClass = entityClass;
  }

  find(): T | null {
    const data = localStorage.getItem(this.key);
    return data ? ClassTransformer.deserialize(this.entityClass, data) : null;
  }

  save(data: T): void {
    localStorage.setItem(this.key, ClassTransformer.serialize(data));
  }

  remove(): void {
    localStorage.removeItem(this.key);
  }
}
