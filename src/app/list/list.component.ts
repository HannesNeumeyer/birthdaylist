import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  user;

  constructor(private db: AngularFirestore, private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      if (!user) return;

      this.user = user
    })
  }

  save(name, date){
    this.db.collection('/users/' + this.user.uid + '/list').add({name: name, date: date})
  }

}
