import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoCollection = this.afs.collection<Todo>('todos');

  constructor(
    private afs: AngularFirestore,
    private store: Store<{ user: User }>
  ) {}

  loadTodos(): Observable<Todo[]> {
    return this.todoCollection.get().pipe(
      take(1),
      map((query) => {
        const todos: Todo[] = [];
        query.forEach((querySnapshot) => todos.push(querySnapshot.data()));
        return todos;
      })
    );
  }

  add(todo: Todo): void {
    console.log('[TodoService] add');
    this.todoCollection
      .add(todo)
      .then(
        (confirmed) => console.log(confirmed),
        (rejected) => console.log(rejected)
      )
      .catch((reason) => console.error(reason));
  }

  update(todo: Todo): void {
    this.afs.doc<Todo>(`${this.todoCollection}/${todo.id}`).update(todo);
  }

  delete(id: string): void {
    this.afs.doc<Todo>(`${this.todoCollection}/${id}`).delete();
  }

  get collectionRef(): AngularFirestoreCollection<Todo> {
    return this.todoCollection;
  }
}
