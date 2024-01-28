import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() sideBarStatus: boolean = false;
  loggedUserData: any;

  constructor(private router: Router) {
    let localData = sessionStorage.getItem('loginUserData');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    };
  }

  ngOnInit(): void {
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
