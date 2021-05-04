import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './../../models/todo.model';
import * as todoActions from './../actions/todo.actions';

export const initialState: Todo[] = [];

const todoReducer = createReducer(
  initialState,
  on(todoActions.ADD, (state: Todo[], props: { todo: Todo }) => [
    ...state,
    props.todo,
  ]),
  on(todoActions.UPDATE, (state: Todo[], props: { todo: Todo }) => {
    const newState: Todo[] = [];
    state.map((todo, i) =>
      todo.id === props.todo.id
        ? newState.push({ ...props.todo })
        : newState.push(state[i])
    );
    return newState;
  }),
  on(todoActions.REMOVE, (state: Todo[], props: { id: string }) =>
    state.filter((todo) => todo.id !== props.id)
  )
);

export const reducer = (state: Todo[] | undefined, action: Action) =>
  todoReducer(state, action);
