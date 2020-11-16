import { ClassTransformer, Clazz } from '../class/ClassTransformer';
import { BaseLocalStorage } from './BaseLocalStorage';

export class BaseIterableLocalStorage<T> extends BaseLocalStorage<T> {
  constructor(key: string, entityClass: Clazz<T>) {
    super(key, entityClass);
  }

  findAll(): T[] | null {
    const data = localStorage.getItem(this.parseKey(this.key));
    return data ? (ClassTransformer.deserializeIterable(this.entityClass, data) as T[]) : null;
  }
}
