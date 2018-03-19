import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class UserService {
  user$: Observable<firebase.User>;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) { 
    this.user$ = afAuth.authState;
  }

  save(user){
    this.db.doc('/users/' + user.uid).set({email: user.email})
  }

  getBirthdays(user){
    return this.db.collection('/users/' + user.uid + '/list').valueChanges()
  }


}
