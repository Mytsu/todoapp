import {
  OnInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Todo } from './../../models/todo.model';
import { uuidv4 } from './../../utils/uuidv4';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @ViewChild('entrada') entrada!: ElementRef;
  @Output() newTodoEvent = new EventEmitter<Todo>();

  constructor() { }
  ngOnInit(): void { }

  newTodo(): void {
    const todo = {
      id: uuidv4(),
      content: this.entrada.nativeElement.value,
      done: false
    };
    this.entrada.nativeElement.value = '';
    this.newTodoEvent.emit(todo);
  }
}
