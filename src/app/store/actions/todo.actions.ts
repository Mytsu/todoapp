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

export const DB_LOAD_INIT = createAction(
  '[Todo] Database Load Init'
);

export const DB_LOAD = createAction(
  '[Todo] Database Load',
  props<{ todos: Todo[] }>()
);

export const OPERATION_SUCCESS = createAction(
  '[Todo] Operation Successful',
  props<{ msg: string }>()
);

export const OPERATION_FAILURE = createAction(
  '[Todo] Operation Failure',
  props<{ msg: string | null; error: any }>()
);
