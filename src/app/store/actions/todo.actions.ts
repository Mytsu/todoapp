import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';

export const add = createAction(
  '[Todo] Add',
  props<{ todo: Todo }>()
);

export const update = createAction(
  '[Todo] Update',
  props<{ todo: Todo }>()
);

export const remove = createAction(
  '[Todo] Delete',
  props<{ id: string }>()
);
