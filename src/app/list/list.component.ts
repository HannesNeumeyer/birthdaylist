import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../user.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  user;
  displayedColumns = ['name', 'date', 'days'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private db: AngularFirestore, private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      if (!user) return;

      this.user = user
      this.userService.getBirthdays(this.user).subscribe(data => {
        this.dataSource.data = data
      })
    })
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  save(name, date){
    var oneDay = 24*60*60*1000; 
    let today = new Date()
    let birthday = new Date(date)
    
    if (today.getMonth() >= birthday.getMonth() && today.getDate() >= birthday.getDate()) 
      {
        birthday.setFullYear(today.getFullYear()+1); 
      } else {
        birthday.setFullYear(today.getFullYear());
      }
    let days = Math.round(Math.abs((today.getTime() - birthday.getTime())/(oneDay)))+1;

    this.db.collection('/users/' + this.user.uid + '/list').add({name: name, date: date, days: days})
  }

}
