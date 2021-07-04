import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [
    { content: 'setup email/password login', done: false },
    { content: 'profile popup menu', done: false },
    { content: 'firebase security rules', done: false },
    { content: 'serverless functions to retrieve app stats', done: false },
    { content: 'routing animations', done: false },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
