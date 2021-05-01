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
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer as todoReducer } from './store/reducers/todo.reducer';
import { reducer as userReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { ListPageComponent } from './containers/list.page.component';
import { UserPageComponent } from './containers/user.page.component';
import { TodoComponent } from './components/todo/todo.component';
import { UserComponent } from './components/auth/user.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NewComponent } from './components/new/new.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { environment } from './../environments/environment';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    ReversePipe,
    AppComponent,
    ListPageComponent,
    UserPageComponent,
    TodoComponent,
    UserComponent,
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
    StoreModule.forRoot({ todos: todoReducer, user: userReducer }),
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
    EffectsModule.forRoot([ UserEffects ]),
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
