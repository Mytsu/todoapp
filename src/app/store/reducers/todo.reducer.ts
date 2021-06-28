import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './../../models/todo.model';
import * as TodoActions from './../actions/todo.actions';

export const initialState: Todo[] = [];

const todoReducer = createReducer(
  initialState,
  on(TodoActions.ADD, (state: Todo[], props: { todo: Todo }) => [...state]),
  on(TodoActions.UPDATE, (state: Todo[], props: { todo: Todo }) => [...state]),
  on(TodoActions.REMOVE, (state: Todo[], props: { id: string }) => [...state]),
  on(TodoActions.DB_LOAD_INIT, (state: Todo[]) => state.slice()),
  on(TodoActions.DB_LOAD, (state: Todo[], props: { todos: Todo[] }) =>
    props.todos
  ),
  on(TodoActions.OPERATION_SUCCESS, (state: Todo[]) => state.slice()),
  on(TodoActions.OPERATION_FAILURE, (state: Todo[], props: { error: any }) =>
    state.slice()
  )
);

export const reducer = (state: Todo[] | undefined, action: Action) =>
  todoReducer(state, action);
