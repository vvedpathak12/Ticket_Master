import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideBarToggled = new EventEmitter<boolean>();
  menuStatus: boolean;
  searchText: string;
  loggedUserData: any;
  showInputSearch: boolean;

  constructor(private _masterSrv: MasterService, private router: Router, private confirmationService: ConfirmationService, private toastr: ToastrService) {
    this.menuStatus = false;
    this.searchText = '';
    this.showInputSearch = false;
    let localData = sessionStorage.getItem('loginUserData');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    };

    this._masterSrv.showSearch$.subscribe((res: any) => {
      this.showInputSearch = res;
    });
  }

  ngOnInit(): void {
  }

  sideBarToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideBarToggled.emit(this.menuStatus);
  }

  onLogOut() {
    this.confirmationService.confirm({
      message: 'Are you sure that you wan to log out?',
      accept: () => {
        sessionStorage.removeItem('loginUserData');
        this.toastr.success('Logged Out Successfully');
        this.router.navigateByUrl('login');
      }
    });
  }

  onSearch(event: any) {
    this._masterSrv.search.next(event);
  }

}
