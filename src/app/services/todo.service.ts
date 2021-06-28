import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.todoCollection.snapshotChanges().pipe(
      map((query) => {
        const todos: Todo[] = [];
        query.forEach((querySnapshot) =>
          todos.push({
            id: querySnapshot.payload.doc.id,
            ...querySnapshot.payload.doc.data(),
          })
        );
        return todos;
      })
    );
  }

  add(todo: Todo): void {
    this.todoCollection
      .add({ content: todo.content, done: todo.done })
      .then(
        (confirmed) => console.log(confirmed),
        (rejected) => console.log(rejected)
      )
      .catch((reason) => console.error(reason));
  }

  update(todo: Todo): void {
    this.todoCollection
      .doc(todo.id)
      .update({ content: todo.content, done: todo.done });
  }

  delete(id: string): void {
    this.todoCollection.doc(id).delete();
  }

  get collectionRef(): AngularFirestoreCollection<Todo> {
    return this.todoCollection;
  }
}
