import { Component, OnInit } from '@angular/core';
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
  isOnline: boolean;
  noInternetImageSrc = "assets/images/no-internet-image.png?{{ cacheBuster }}";
  cacheBuster: string = new Date().getTime().toString(); // Generate a cache-busting value

  constructor(private _master: MasterService) {
    let localData = sessionStorage.getItem('loginUserData');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    };
    this.searchTxt = '';
    this.isOnline = true;
    this._master.onlineStatus$.subscribe((status: any) => {
      this.isOnline = status;
      this.cacheBuster = new Date().getTime().toString(); // Update the cache-busting value
    });
  }

  ngOnInit(): void {
  }

}
