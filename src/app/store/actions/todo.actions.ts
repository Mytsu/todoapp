import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';

export const ADD = createAction(
  '[Todo] Add',
  props<{ todo: Todo }>()
);

export const UPDATE = createAction(
  '[Todo] Update',
  props<{ todo: Todo }>()
);

export const REMOVE = createAction(
  '[Todo] Delete',
  props<{ id: string }>()
);
