import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './store/reducers/todo.reducer';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { PageListComponent } from './containers/page-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NewComponent } from './components/new/new.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    ReversePipe,
    AppComponent,
    PageListComponent,
    TodoComponent,
    LoginComponent,
    NotFoundComponent,
    NewComponent,
    NavbarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserModule,
    StoreModule.forRoot({ todos: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
