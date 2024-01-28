import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  loggedUserData: any;
  searchTxt: string;
  sideBarStatus: boolean = false;

  constructor() {
    let localData = sessionStorage.getItem('loginUserData');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    };
    this.searchTxt = '';
  }

  ngOnInit(): void {
  }

}
