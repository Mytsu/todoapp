import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { add, remove, update } from '../store/actions/todo.actions';

@Component({
  selector: 'app-pagelist',
  template: `
    <app-new (newTodoEvent)="add($event)"></app-new>
    <ng-container *ngIf="(todos$ | async) as todos">
      <app-todo
        *ngFor="let todo of todos | reverse"
        [todo]="todo"
        (toggleUpdateEvent)="toggle($event)"
        (removeEvent)="remove($event)">
      </app-todo>
    </ng-container>
  `,
  styles: [``],
})
export class PageListComponent {
  todos$!: Observable<Todo[]>;

  constructor(private store: Store<{ todos: Todo[] }>) {
    this.todos$ = this.store.select('todos').pipe(tap(console.log));
  }

  add(newTodo: Todo): void {
    this.store.dispatch(add({ todo: newTodo }));
  }

  toggle(todo: Todo): void {
    const newTodo: Todo = {
      ...todo,
      done: !todo.done
    };
    this.store.dispatch(
      update({ todo: newTodo })
    );
  }

  remove(todoId: string): void {
    this.store.dispatch(remove({ id: todoId }));
  }
}
