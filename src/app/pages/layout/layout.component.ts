import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { LoginService } from 'src/app/core/services/login.service';
import { MasterService } from 'src/app/core/services/master.service';

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
