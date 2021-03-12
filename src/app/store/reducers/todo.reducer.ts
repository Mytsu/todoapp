import { Action, createReducer, on } from '@ngrx/store';
import { uuidv4 } from './../../utils/uuidv4';
import { Todo } from './../../models/todo.model';
import { add, update, remove } from './../actions/todo.actions';

export const initialState: Todo[] = [
  { id: uuidv4(), done: false, content: 'Teste' },
  { id: uuidv4(), done: false, content: 'Teste2' },
  { id: uuidv4(), done: false, content: 'Teste3' },
];

const todoReducer = createReducer(
  initialState,
  on(add, (state: Todo[], props: { todo: Todo }) => [...state, props.todo]),
  on(update, (state: Todo[], props: { todo: Todo }) => {
    const newState: Todo[] = [];
    state.map((todo, i) =>
      (todo.id === props.todo.id) ?
        newState.push({ ...props.todo }) : newState.push(state[i])
    );
    return newState;
  }),
  on(remove, (state: Todo[], props: { id: string }) =>
    state.filter((todo) => todo.id !== props.id)
  )
);

export const reducer = (state: Todo[] | undefined, action: Action) =>
  todoReducer(state, action);
