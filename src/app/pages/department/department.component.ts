import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { createUpdateDepartment } from 'src/app/core/models/classes/classes';
import { IEmployee, IDepartment } from 'src/app/core/models/interfaces/IUser';
import { DepartmentService } from 'src/app/core/services/department.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  @ViewChild('deptForm') deptForm!: NgForm
  departmentArr: IDepartment[];
  filteredDepartmentArr: IDepartment[];
  departmentObj: createUpdateDepartment;
  isApiCallInProgress: boolean;
  displayModalDept: boolean;
  $emp: Observable<IEmployee[]> | undefined;

  constructor(private _empSrv: EmployeeService, private toastr: ToastrService, private _departmentSrv: DepartmentService, private confirm: ConfirmationService, private _masterSrv: MasterService) {
    this.$emp = this._empSrv.getAllEmployees();
    this.filteredDepartmentArr = [];
    this.departmentObj = new createUpdateDepartment();
    this.isApiCallInProgress = false;
    this.departmentArr = [];
    this.displayModalDept = false;
    this._masterSrv.search.subscribe((res: any) => {
      this.filteredDepartmentArr = this.departmentArr.filter((searchData: any) => {
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
    this.loadAllDepartment();
  }

  onAddDept() {
    this.displayModalDept = true;
    this.deptForm.resetForm();
    this.onReset();
  }

  loadAllDepartment() {
    this._masterSrv.showLoader.next(true);
    this._departmentSrv.getDepartments().subscribe((res: any) => {
      if (res) {
        this._masterSrv.showLoader.next(false);
        this.departmentArr = res;
        this.filteredDepartmentArr = res;
      } else {
        this._masterSrv.showLoader.next(false);
      }
    }, (err: any) => {
      this._masterSrv.showLoader.next(false);
    });
  }

  onSaveDept() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._departmentSrv.createDepartment(this.departmentObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.loadAllDepartment();
          this.toastr.success('Department Created Successfully');
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
    }
  }

  onEdit(item: createUpdateDepartment) {
    this.departmentObj = item;
    this.displayModalDept = true;
  }

  onUpdateDept() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._departmentSrv.updateDepartment(this.departmentObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.loadAllDepartment();
          this.toastr.success('Department Updated Successfully');
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
    }
  }

  onDelete(item: createUpdateDepartment) {
    this.confirm.confirm({
      message: 'Are you sure that you want delete?',
      accept: () => {
        this._departmentSrv.deleteDepartment(item.deptId).subscribe((res: any) => {
          if (res.result) {
            const index = this.filteredDepartmentArr.findIndex((m: any) => m.deptId == item.deptId);
            this.filteredDepartmentArr.splice(index, 1);
            this.toastr.error('Record Deleted Successfully!!');
          }
        });
      }
    });
  }

  onCancel() {
    this.displayModalDept = false;
  }

  onReset() {
    this.departmentObj = new createUpdateDepartment();
  }

}
