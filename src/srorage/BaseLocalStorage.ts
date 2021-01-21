import { ClassTransformer, Clazz } from '../class/ClassTransformer';
import { Storage } from './Storage';

export class BaseLocalStorage<T> implements Storage<T> {
  readonly key: string;
  protected readonly entityClass: Clazz<T>;

  constructor(key: string, entityClass: Clazz<T>) {
    this.key = key;
    this.entityClass = entityClass;
  }

  find(): T | null {
    const data = localStorage.getItem(this.parseKey(this.key));
    return data ? ClassTransformer.deserialize(this.entityClass, data) : null;
  }

  save(data: T | T[] | null): void {
    localStorage.setItem(this.parseKey(this.key), ClassTransformer.serialize(data));
  }

  remove(): void {
    localStorage.removeItem(this.parseKey(this.key));
  }

  protected parseKey(key: string): string {
    const prefix = process.env.REACT_APP_STORAGE_KEY_PREFIX || '_';
    return prefix + key;
  }
}
