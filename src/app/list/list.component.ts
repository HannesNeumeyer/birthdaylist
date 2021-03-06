import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserService } from '../user.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  isLoading = true;
  user;
  displayedColumns = ['name', 'date', 'days', 'years', 'delete'];
  dataSource = new MatTableDataSource<any>();
  idList = [];
  names;
  dates;

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
      this.db.collection('/users/' + this.user.uid + '/list').snapshotChanges().map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            data: doc.payload.doc.data()
          }
        })
      }).subscribe(idList => {
        this.idList = idList
        this.isLoading = false;
        this.update()
        // don't need to unsubscribe here because old subscription is overwritten (only shows up once per console.log)
      })
    })
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  save(name, date){
    let oneDay = 24*60*60*1000; 
    let today = new Date()
    let birthday = new Date(date)
    let tYear = new Date().getFullYear();
    let bYear = new Date(date).getFullYear();
    
    if (today.getMonth() > birthday.getMonth()) 
      {
        birthday.setFullYear(today.getFullYear()+1); 
        bYear -= 1;
      } 
    else if (today.getMonth() == birthday.getMonth() && today.getDate() >= birthday.getDate())
      {
        birthday.setFullYear(today.getFullYear()+1); 
        bYear -= 1;
      }   
    else {
        birthday.setFullYear(today.getFullYear());
      }

    let days = Math.round(Math.abs((today.getTime() - birthday.getTime())/(oneDay)))+1;
    let years = tYear - bYear

    this.db.collection('/users/' + this.user.uid + '/list').add({name: name, date: date, days: days, years: years})
    this.names = '';
    this.dates = '';
    console.log(birthday)
  }

  delete(name, date){    
    let idd;
    this.idList.forEach(data => {
      if (data.data.name == name && data.data.date == date){
        idd = data.id
      }
      this.db.doc('/users/' + this.user.uid + '/list/' + idd).delete()
    })
  }

  update(){ 
    let oneDay = 24*60*60*1000; 
    let today = new Date()
    let birthday;    
    
    let idd;
    this.idList.forEach(data => {
      idd = data.id
      birthday = new Date(data.data.date)

      let tYear = new Date().getFullYear();
      let bYear = birthday.getFullYear();
      
      if (today.getMonth() > birthday.getMonth()) 
        {
          birthday.setFullYear(today.getFullYear()+1); 
          bYear -= 1;
        } 
      else if (today.getMonth() == birthday.getMonth() && today.getDate() >= birthday.getDate())
        {
          birthday.setFullYear(today.getFullYear()+1); 
          bYear -= 1;
        }   
      else {
          birthday.setFullYear(today.getFullYear());
        }

      let days = Math.round(Math.abs((today.getTime() - birthday.getTime())/(oneDay)));
      let years = tYear - bYear

      this.db.doc('/users/' + this.user.uid + '/list/' + idd).update({days: days, years: years})
    })
  }


}
