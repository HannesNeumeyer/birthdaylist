import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user;
  eandp = false;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(x => this.user = x)
  }

  login(){
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  onSubmit(form: NgForm){
    this.afAuth.auth.createUserWithEmailAndPassword(form.value.email, form.value.password)
    this.eandp = false;
  }

  onLogin(form: NgForm){
    this.afAuth.auth.signInWithEmailAndPassword(form.value.emaill, form.value.passwordd)
    this.eandp = false;
  }

  logout(){
    this.afAuth.auth.signOut();
    window.location.reload();
  }

}
