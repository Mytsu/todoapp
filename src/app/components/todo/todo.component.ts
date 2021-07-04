import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from './../../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.css']
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Input() options = {
    checkbox: true,
    delete: true
  };
  @Output() toggleUpdateEvent = new EventEmitter<Todo>();
  @Output() removeEvent = new EventEmitter<string>();

  update(): void {
    this.toggleUpdateEvent.emit(this.todo);
  }

  remove(): void {
    this.removeEvent.emit(this.todo.id);
  }
}
