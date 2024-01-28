import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { createUpdateEmpObject } from 'src/app/core/models/classes/classes';
import { IDepartment } from 'src/app/core/models/interfaces/IUser';
import { DepartmentService } from 'src/app/core/services/department.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { MasterService } from 'src/app/core/services/master.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideBarToggled = new EventEmitter<boolean>();
  menuStatus: boolean;
  empObj: createUpdateEmpObject;
  displayModalEmp: boolean;
  loggedUserData: any;
  $department: Observable<IDepartment[]> | undefined;
  emailPattern: string;
  contactPattern: string;
  isApiCallInProgress: boolean;
  searchText: string;
  showInputSearch: boolean;
  subscription: Subscription[];

  constructor(private _masterSrv: MasterService, private _empSrv: EmployeeService, private _departmentSrv: DepartmentService, private router: Router, private confirmationService: ConfirmationService, private toastr: ToastrService) {
    this.menuStatus = false;
    this.empObj = new createUpdateEmpObject();
    this.displayModalEmp = false;
    this.$department = _departmentSrv.getDepartments();
    this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    this.contactPattern = "^((\\+91-?)|0)?[0-9]{10}$";
    this.isApiCallInProgress = false;
    this.searchText = '';
    this.showInputSearch = false;
    this.subscription = [];
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

  getEmployeeById() {
    const getEmployeeById = this._empSrv.getEmployeeById(this.loggedUserData.employeeId).subscribe((res: any) => {
      if (res.result) {
        this.empObj = res.data;
        this.displayModalEmp = true;
      }
    });
    this.subscription.push(getEmployeeById);
  }

  updateEmpProfile() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      const updateEmployee = this._empSrv.updateEmployee(this.empObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success('Profile Updated Successfully');
          this.onCancel();
        } else {
          this.isApiCallInProgress = false;
          this.toastr.error(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      });
      this.subscription.push(updateEmployee);
    }
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

  onCancel() {
    this.displayModalEmp = false;
  }

  onSearch(event: any) {
    this._masterSrv.search.next(event);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((ele: any) => {
      ele.unsubscribe();
    });
  }

}
