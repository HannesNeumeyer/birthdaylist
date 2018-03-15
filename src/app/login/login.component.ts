import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    this.router.navigate(['/birthday-list'])
  }

  onSubmit(form: NgForm){
    this.afAuth.auth.createUserWithEmailAndPassword(form.value.email, form.value.password).then(result => {
      this.router.navigate(['/birthday-list'])
    })
  }

  onLogin(form: NgForm){
    this.afAuth.auth.signInWithEmailAndPassword(form.value.emaill, form.value.passwordd).then(result => {
      this.router.navigate(['/birthday-list'])
    })
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
