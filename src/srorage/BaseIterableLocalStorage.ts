import { ClassTransformer } from '../class/ClassTransformer';
import { BaseLocalStorage } from './BaseLocalStorage';

export class BaseIterableLocalStorage<T> extends BaseLocalStorage<T> {
  findAll(): T[] | null {
    const data = localStorage.getItem(this.parseKey(this.key));
    return data ? (ClassTransformer.deserializeIterable(this.entityClass, data) as T[]) : null;
  }
}
