import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
          {path:'', component: LoginComponent},
          {path:'birthday-list', component: ListComponent},
        ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
