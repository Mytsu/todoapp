import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import * as TodoActions from '../store/actions/todo.actions';

@Component({
  selector: 'app-listpage',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <app-new (newTodoEvent)="add($event)"></app-new>
      <ng-container *ngIf="todos$ | async as todos">
        <app-todo
          *ngFor="let todo of todos | reverse"
          [todo]="todo"
          (toggleUpdateEvent)="toggle($event)"
          (removeEvent)="remove($event)"
        >
        </app-todo>
      </ng-container>
    </div>
  `,
  styles: [``],
})
export class ListPageComponent {
  todos$!: Observable<Todo[]>;

  constructor(private store: Store<{ todos: Todo[] }>) {
    this.todos$ = this.store.select('todos');
  }

  add(newTodo: Todo): void {
    console.log('[ListPageComponent] add');
    this.store.dispatch(TodoActions.ADD({ todo: newTodo }));
  }

  toggle(todo: Todo): void {
    const newTodo: Todo = {
      ...todo,
      done: !todo.done,
    };
    this.store.dispatch(TodoActions.UPDATE({ todo: newTodo }));
  }

  remove(todoId: string): void {
    this.store.dispatch(TodoActions.REMOVE({ id: todoId }));
  }
}
