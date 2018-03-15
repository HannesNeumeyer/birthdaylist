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
  displayedColumns = ['name', 'date'];
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
    this.db.collection('/users/' + this.user.uid + '/list').add({name: name, date: date})
  }

}
