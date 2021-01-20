import { Paginateable } from './Paginateable';

export interface PageableResult<T, E> {
  data: T[];
  paginator: Paginateable;
  error?: E;
}
