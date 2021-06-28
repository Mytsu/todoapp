import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap, switchMap } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import * as TodoActions from '../actions/todo.actions';
import { Todo } from '../../models/todo.model';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class TodoEffects {
  dbLoadInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.DB_LOAD_INIT),
      exhaustMap(() =>
        this.todoService
          .loadTodos()
          .pipe(map((todos: Todo[]) => TodoActions.DB_LOAD({ todos })))
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
        tap((state) => {
          this.todoService.add(state.todo);
        })
      ),
    { dispatch: false }
  );

  update$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.UPDATE),
        tap((state) => this.todoService.update(state.todo))
      ),
    { dispatch: false }
  );

  delete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.REMOVE),
        tap((state) => this.todoService.delete(state.id))
      ),
    { dispatch: false }
  );

  opSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.OPERATION_SUCCESS),
      tap((state) => console.log(`[Todo] ${state.msg}`))
    )
  );

  opFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.OPERATION_FAILURE),
      tap((state) => console.log(`[Todo] ${state.msg}\n${state.error}`))
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private userService: UserService) {}
}
