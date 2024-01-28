import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { createUpdateEmpObject } from 'src/app/core/models/classes/classes';
import { IDepartment, IEmployee } from 'src/app/core/models/interfaces/IUser';
import { DepartmentService } from 'src/app/core/services/department.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { MasterService } from 'src/app/core/services/master.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  @ViewChild('empForm') empForm!: NgForm;
  empArr: IEmployee[];
  filteredEmpArr: IEmployee[];
  empObj: createUpdateEmpObject;
  isApiCallInProgress: boolean;
  $department: Observable<IDepartment[]> | undefined;
  $roles: Observable<any[]> | undefined;
  displayModalEmp: boolean;
  emailPattern: string;
  contactPattern: string;
  first: number;
  rows: number;
  subscription: Subscription[];

  constructor(private _empSrv: EmployeeService, private toastr: ToastrService, private _departmentSrv: DepartmentService, private confirm: ConfirmationService, private _masterSrv: MasterService) {
    this.empArr = [];
    this.filteredEmpArr = [];
    this.empObj = new createUpdateEmpObject();
    this.isApiCallInProgress = false;
    this.$department = _departmentSrv.getDepartments();
    this.$roles = this._empSrv.getAllRoles();
    this.displayModalEmp = false;
    this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    this.contactPattern = "^((\\+91-?)|0)?[0-9]{10}$";
    this.first = 0;
    this.rows = 12;
    this.subscription = [];
    this._masterSrv.search.subscribe((res: any) => {
      this.filteredEmpArr = this.empArr.filter((searchData: any) => {
        let search = res.toLowerCase();
        const values = Object.values(searchData);
        let flag = false;
        for (let val of values) {
          // Check if 'val' is not null before calling 'toString'
          if (val !== null && (val as string).toString().toLowerCase().indexOf(search) > -1) {
            flag = true;
            break;
          }
        }
        return flag;
      });
    });
    this._masterSrv.showLoader.next(false);
    this._masterSrv.setShowSearch(true);
  }

  ngOnInit(): void {
    this.loadAllEmployee();
  }

  loadAllEmployee() {
    this._masterSrv.showLoader.next(true);
    const getAllEmployees = this._empSrv.getAllEmployees().subscribe((res: any) => {
      if (res) {
        this._masterSrv.showLoader.next(false);
        this.empArr = res;
        this.filteredEmpArr = res;
      } else {
        this._masterSrv.showLoader.next(false);
      }
    }, (err: any) => {
      this._masterSrv.showLoader.next(false);
    });
    this.subscription.push(getAllEmployees);
  }

  onAddEmp() {
    this.displayModalEmp = true;
    this.empForm?.resetForm();
    this.onReset();
  }

  onSaveEmp() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      const createEmployee = this._empSrv.createEmployee(this.empObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.loadAllEmployee();
          this.toastr.success('Employee Added Successfully');
          this.onReset();
          this.onCancel();
        } else {
          this.isApiCallInProgress = false;
          this.toastr.error(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      });
      this.subscription.push(createEmployee);
    }
  }

  onEdit(item: createUpdateEmpObject) {
    const getEmployeeById = this._empSrv.getEmployeeById(item.employeeId).subscribe((res: any) => {
      if (res.result) {
        this.empObj = res.data;
        this.displayModalEmp = true;
      }
    });
    this.subscription.push(getEmployeeById);
  }

  onUpdateEmp() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      const updateEmployee = this._empSrv.updateEmployee(this.empObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.loadAllEmployee();
          this.toastr.success('Employee Updated Successfully');
          this.onReset();
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

  onDelete(item: createUpdateEmpObject) {
    this.confirm.confirm({
      message: 'Are you sure that you want delete?',
      accept: () => {
        const deleteEmployee = this._empSrv.deleteEmployee(item.employeeId).subscribe((res: any) => {
          if (res.result) {
            const index = this.filteredEmpArr.findIndex((m: any) => m.employeeId == item.employeeId);
            this.filteredEmpArr.splice(index, 1);
            this.toastr.error('Employee Record Deleted Successfully!!');
          }
        });
        this.subscription.push(deleteEmployee);
      }
    });
  }

  onReset() {
    this.empObj = new createUpdateEmpObject();
  }

  onCancel() {
    this.displayModalEmp = false;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  refresh() {
    this.loadAllEmployee();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((ele: any) => {
      ele.unsubscribe();
    });
  }
}
