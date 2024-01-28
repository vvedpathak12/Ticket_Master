import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { assignTicketObject, createNewTicketObject } from 'src/app/core/models/classes/classes';
import { IDepartment, IEmployeeById } from 'src/app/core/models/interfaces/IUser';
import { DepartmentService } from 'src/app/core/services/department.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { MasterService } from 'src/app/core/services/master.service';
import { TicketService } from 'src/app/core/services/ticket.service';
@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit, OnDestroy {
  @ViewChild('ticketFrm') ticketFrm!: NgForm;
  @ViewChild('assignTicketForm') assignTicketForm!: NgForm;
  ticketObj: createNewTicketObject;
  $department: Observable<IDepartment[]> | undefined;
  ticketArr: any[];
  filteredTicketArr: any[];
  $emp: Observable<IEmployeeById[]> | undefined;
  isApiCallInProgress: boolean;
  loggedInUserData: any;
  showTicketForm: boolean;
  displayModalAssignTicket: boolean;
  assignTicketObj: assignTicketObject;
  subscription: Subscription[];

  constructor(private _departmentSrv: DepartmentService, private toastr: ToastrService, private _ticketSrv: TicketService, private _masterSrv: MasterService, private _empSrv: EmployeeService, private confirm: ConfirmationService) {
    this.ticketObj = new createNewTicketObject();
    this.ticketArr = [];
    this.filteredTicketArr = [];
    this.isApiCallInProgress = false;
    this.showTicketForm = false;
    this.displayModalAssignTicket = false;
    this.assignTicketObj = new assignTicketObject();
    this.subscription = [];
    let localData = sessionStorage.getItem('loginUserData');
    if (localData != null) {
      this.loggedInUserData = JSON.parse(localData);
      this.ticketObj.employeeId = this.loggedInUserData.employeeId;
    }
    this._masterSrv.search.subscribe((res: any) => {
      this.filteredTicketArr = this.ticketArr.filter((searchData: any) => {
        let search = res.toLowerCase(); // Convert the search string to lowercase
        const values = Object.values(searchData);
        let flag = false;
        for (let val of values) {
          // Check if 'val' is not null before calling 'toString'
          if (val !== null && (val as string).toString().toLowerCase().indexOf(search) > -1) {
            flag = true;
            break; // Use 'break' to exit the loop early
          }
        }
        return flag;
      });
    });
    this._masterSrv.showLoader.next(false);
    this._masterSrv.setShowSearch(true);
  }

  ngOnInit(): void {
    this.loadTicketsByRoles();
  }

  loadTicketsByRoles() {
    if (this.loggedInUserData.role == 'Super Admin') {
      this.loadAllTickets();
    } else if (this.loggedInUserData.role == 'Employee') {
      this.loadTicketsCreatedByEmpId();
    } else if (this.loggedInUserData.role == 'Department Head') {
      this.loadNewTicketsByDeptHeadEmpId();
      this.$emp = this._empSrv.getEmployeesByDeptId(this.loggedInUserData.deptId);
    } else if (this.loggedInUserData.role == 'Admin Department Employee') {
      this.loadAssignedTicketsByEmpId();
    }
  }

  addNewTicket() {
    this.showTicketForm = !this.showTicketForm;
    if (this.showTicketForm) {
      this.$department = this._departmentSrv.getDepartments();
    }
  }

  loadAllTickets() {
    this._masterSrv.showLoader.next(true);
    const getAllTickets = this._ticketSrv.getAllTickets().subscribe((res: any) => {
      if (res.result) {
        this._masterSrv.showLoader.next(false);
        this.ticketArr = res.data;
        this.filteredTicketArr = res.data;
      } else {
        this._masterSrv.showLoader.next(false);
      }
    }, (err: any) => {
      this._masterSrv.showLoader.next(false);
    });
    this.subscription.push(getAllTickets);
  }

  loadTicketsCreatedByEmpId() {
    this._masterSrv.showLoader.next(true);
    const getTicketsCreatedByEmpId = this._ticketSrv.getTicketsCreatedByEmpId(this.loggedInUserData.employeeId).subscribe((res: any) => {
      if (res.result) {
        this._masterSrv.showLoader.next(false);
        this.ticketArr = res.data;
        this.filteredTicketArr = res.data;
      } else {
        this._masterSrv.showLoader.next(false);
      }
    }, (err: any) => {
      this._masterSrv.showLoader.next(false);
    });
    this.subscription.push(getTicketsCreatedByEmpId);
  }

  loadNewTicketsByDeptHeadEmpId() {
    this._masterSrv.showLoader.next(true);
    const getNewTickets = this._ticketSrv.getNewTickets(this.loggedInUserData.employeeId).subscribe((res: any) => {
      if (res.result) {
        this._masterSrv.showLoader.next(false);
        this.ticketArr = res.data;
        this.filteredTicketArr = res.data;
      } else {
        this._masterSrv.showLoader.next(false);
      }
    }, (err: any) => {
      this._masterSrv.showLoader.next(false);
    });
    this.subscription.push(getNewTickets);
  }

  loadAssignedTicketsByEmpId() {
    this._masterSrv.showLoader.next(true);
    const getAssignedTicketsByEmpId = this._ticketSrv.getAssignedTicketsByEmpId(this.loggedInUserData.employeeId).subscribe((res: any) => {
      if (res.result) {
        this._masterSrv.showLoader.next(false);
        this.ticketArr = res.data;
        this.filteredTicketArr = res.data;
      } else {
        this._masterSrv.showLoader.next(false);
      }
    }, (err: any) => {
      this._masterSrv.showLoader.next(false);
    });
    this.subscription.push(getAssignedTicketsByEmpId);
  }

  createNewTicket() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      const createNewTicket = this._ticketSrv.createNewTicket(this.ticketObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success('Ticket Created Successfully');
          this.loadTicketsByRoles();
          this.showTicketForm = false;
          this.onReset();
        } else {
          this.isApiCallInProgress = false;
          this.toastr.error(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      });
      this.subscription.push(createNewTicket);
    }
  }

  onDelete(item: any) {
    this.confirm.confirm({
      message: 'Are you sure that you want delete?',
      accept: () => {
        const deleteTicket = this._ticketSrv.deleteTicket(item.ticketId).subscribe((res: any) => {
          if (res.result) {
            const index = this.filteredTicketArr.findIndex((m: any) => m.ticketId == item.ticketId);
            this.filteredTicketArr.splice(index, 1);
            this.toastr.error('Record Deleted Successfully!!');
          }
        });
        this.subscription.push(deleteTicket);
      }
    });
  }

  openAssignTicketModal(ticketId: number) {
    this.displayModalAssignTicket = true;
    this.assignTicketObj.ticketId = ticketId;
    this.assignTicketForm.resetForm();
  }

  assignTicket() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      const assignRequest = this._ticketSrv.assignRequest(this.assignTicketObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success('Ticket Assigned Successfully');
          this.loadTicketsByRoles();
          this.displayModalAssignTicket = false;
          this.onCancel();
        } else {
          this.isApiCallInProgress = false;
          this.toastr.error(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      });
      this.subscription.push(assignRequest);
    }
  }

  onCancel() {
    this.assignTicketObj = new assignTicketObject();
  }

  onReset() {
    this.ticketObj = new createNewTicketObject();
  }

  startAssignedTicket(ticketId: number) {
    const startTicket = this._ticketSrv.startTicket(ticketId).subscribe((res: any) => {
      if (res.result) {
        this.toastr.success('Ticket Status Changed to Started');
        this.loadTicketsByRoles();
      }
    });
    this.subscription.push(startTicket);
  }

  closeAssignedTicket(ticketId: number) {
    const closeTicket = this._ticketSrv.closeTicket(ticketId).subscribe((res: any) => {
      if (res.result) {
        this.toastr.success('Ticket Status Changed to Closed');
        this.loadTicketsByRoles();
      }
    });
    this.subscription.push(closeTicket);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((ele: any) => {
      ele.unsubscribe();
    });
  }

}
