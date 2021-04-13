import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer as todoReducer } from './store/reducers/todo.reducer';
import { reducer as authReducer } from './store/reducers/auth.reducer';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { ListPageComponent } from './containers/list.page.component';
import { AuthPageComponent } from './containers/auth.page.component';
import { TodoComponent } from './components/todo/todo.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NewComponent } from './components/new/new.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { environment } from './../environments/environment';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    ReversePipe,
    AppComponent,
    ListPageComponent,
    AuthPageComponent,
    TodoComponent,
    AuthComponent,
    NotFoundComponent,
    NewComponent,
    NavbarComponent,
    SignUpComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserModule,
    StoreModule.forRoot({ todos: todoReducer, auth: authReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true,
    }),
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    EffectsModule.forRoot([]),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
