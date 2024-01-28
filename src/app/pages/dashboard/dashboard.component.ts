import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { adminEmployeeDashboardObject, deptHeadDashboardObject, employeeDashboardObject, superAdminDashboardObject } from 'src/app/core/models/classes/classes';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MasterService } from 'src/app/core/services/master.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('counterAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition(':enter', [
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  superAdminDashboardObj: superAdminDashboardObject;
  empDashboardObj: employeeDashboardObject;
  adminEmployeeDashboardObj: adminEmployeeDashboardObject;
  deptHeadDashboardObj: deptHeadDashboardObject;
  loggedInUserData: any;
  dashboardLoadCounter: number;
  subscription: Subscription[];

  constructor(private _dashboardSrv: DashboardService, private _masterSrv: MasterService) {
    this.superAdminDashboardObj = new superAdminDashboardObject();
    this.empDashboardObj = new employeeDashboardObject();
    this.adminEmployeeDashboardObj = new adminEmployeeDashboardObject();
    this.deptHeadDashboardObj = new deptHeadDashboardObject();
    this.dashboardLoadCounter = 0;
    this.subscription = [];

    let localData = sessionStorage.getItem('loginUserData');
    if (localData != null) {
      this.loggedInUserData = JSON.parse(localData);
    }
    this._masterSrv.showLoader.next(false);
    this._masterSrv.setShowSearch(false);
  }

  ngOnInit(): void {
    this.loadDashboardsByRole();
  }

  loadDashboardsByRole() {
    if (this.loggedInUserData.role == 'Super Admin') {
      this.loadSuperAdminDashboard();
    } else if (this.loggedInUserData.role == 'Employee') {
      this.loadEmployeeDashboard();
    } else if (this.loggedInUserData.role == 'Department Head') {
      this.loadDepartmentHeadDashboard();
    } else if (this.loggedInUserData.role == 'Admin Department Employee') {
      this.loadAdminEmployeeDashboard();
    }
  }

  loadSuperAdminDashboard() {
    // Increment the counter before making the API call
    this.dashboardLoadCounter++;
    const getSuperAdminDashboard = this._dashboardSrv.getSuperAdminDashboard().subscribe((res: any) => {
      if (res.result) {
        this.superAdminDashboardObj = res.data;
      }
    });
    this.subscription.push(getSuperAdminDashboard);
  }

  loadEmployeeDashboard() {
    this.dashboardLoadCounter++;
    const getEmployeeDashByEmpId = this._dashboardSrv.getEmployeeDashByEmpId(this.loggedInUserData.employeeId).subscribe((res: any) => {
      if (res.result) {
        this.empDashboardObj = res.data;
      }
    });
    this.subscription.push(getEmployeeDashByEmpId);
  }

  loadAdminEmployeeDashboard() {
    this.dashboardLoadCounter++;
    const getAdminEmployeeDashByEmpId = this._dashboardSrv.getAdminEmployeeDashByEmpId(this.loggedInUserData.employeeId).subscribe((res: any) => {
      if (res.result) {
        this.adminEmployeeDashboardObj = res.data;
      }
    });
    this.subscription.push(getAdminEmployeeDashByEmpId);
  }

  loadDepartmentHeadDashboard() {
    this.dashboardLoadCounter++;
    const getDeptHeadDashboardByDeptHead = this._dashboardSrv.getDeptHeadDashboardByDeptHead(this.loggedInUserData.employeeId).subscribe((res: any) => {
      if (res.result) {
        this.deptHeadDashboardObj = res.data;
      }
    });
    this.subscription.push(getDeptHeadDashboardByDeptHead);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((ele: any) => {
      ele.unsubscribe();
    });
  }
}
