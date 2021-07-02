import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { User, UserState } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private user$: Observable<User | null>;

  constructor(
    private afs: AngularFirestore,
    private store: Store<{ user: UserState }>
  ) {
    this.user$ = this.store.select((state) => state.user.user);
  }

  add(todo: Todo): void {
    this.collectionRef.pipe(
      map((todoCollection) =>
        todoCollection.add({ content: todo.content, done: todo.done })
      ),
    );
  }

  update(todo: Todo): Observable<void> {
    if(!environment.production) {
      console.log(`[TodoService] update: ${todo.id}`);
    }
    return this.collectionRef.pipe(
      mergeMap((todoCollection) =>
        todoCollection
          .doc(todo.id)
          .update({ content: todo.content, done: todo.done })
          .catch((reason) => console.error(reason))
      )
    );
  }

  delete(id: string): Observable<void> {
    return this.collectionRef.pipe(
      mergeMap((todoCollection) => todoCollection.doc(id).delete())
    );
  }

  get collectionRef(): Observable<AngularFirestoreCollection<Todo>> {
    return this.user$.pipe(
      map((user) =>
        this.afs
          .collection<Todo>(`users/${user?.uid}/todos`)
      )
    );
  }

  get todos(): Observable<Todo[]> {
    return this.collectionRef.pipe(
      mergeMap((todoCollection) =>
        todoCollection.snapshotChanges().pipe(
          map((data) =>
            data.map((todo) => {
              const todoData = todo.payload.doc.data();
              return {
                id: todo.payload.doc.id,
                content: todoData.content,
                done: todoData.done,
              } as Todo;
            })
          )
        )
      )
    );
  }
}
