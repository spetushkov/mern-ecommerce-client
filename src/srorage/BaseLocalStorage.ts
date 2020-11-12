import { ClassTransformer, Clazz } from '../class/ClassTransformer';
import { Storage } from './Storage';

export class BaseLocalStorage<T> implements Storage<T> {
  readonly key: string;
  private entityClass: Clazz<T>;

  constructor(key: string, entityClass: Clazz<T>) {
    this.key = key;
    this.entityClass = entityClass;
  }

  find(): T | T[] | null {
    const data = localStorage.getItem(this.parseKey(this.key));
    return data ? ClassTransformer.deserialize(this.entityClass, data) : null;
  }

  save(data: T | T[]): void {
    localStorage.setItem(this.parseKey(this.key), ClassTransformer.serialize(data));
  }

  remove(): void {
    localStorage.removeItem(this.parseKey(this.key));
  }

  private parseKey(key: string): string {
    let prefix = process.env.REACT_APP_STORAGE_KEY_PREFIX;
    if (!prefix) {
      prefix = '_';
    }
    return prefix + key;
  }
}
