import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageListComponent } from './containers/page-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  { path: '', component: PageListComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
