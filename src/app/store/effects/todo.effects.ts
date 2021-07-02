import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TodoService } from '../../services/todo.service';
import * as TodoActions from '../actions/todo.actions';
import { Todo } from '../../models/todo.model';

@Injectable()
export class TodoEffects {
  dbLoadInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.DB_LOAD_INIT),
      exhaustMap(() =>
        this.todoService.todos.pipe(
          map((todos: Todo[]) => TodoActions.DB_LOAD({ todos }))
        )
      ),
      catchError((error) =>
        of(
          TodoActions.OPERATION_FAILURE({
            msg: 'Failed to download todos from firebase',
            error,
          })
        )
      )
    )
  );

  add$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.ADD),
        tap((state) => this.todoService.add(state.todo).subscribe())
      ),
    { dispatch: false }
  );

  update$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.UPDATE),
        tap((state) => this.todoService.update(state.todo).subscribe())
      ),
    { dispatch: false }
  );

  delete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.REMOVE),
        tap((state) => this.todoService.delete(state.id).subscribe())
      ),
    { dispatch: false }
  );

  opSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.OPERATION_SUCCESS)
    )
  );

  opFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.OPERATION_FAILURE)
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
