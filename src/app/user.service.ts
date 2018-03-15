import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserService {
  user$: Observable<firebase.User>;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) { 
    this.user$ = afAuth.authState;
  }

  save(user){
    this.db.collection('/users').add({email: user.email})
  }
}
