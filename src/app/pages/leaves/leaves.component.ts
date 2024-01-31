import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { leaveObject } from 'src/app/core/models/classes/classes';
import { ILeaves } from 'src/app/core/models/interfaces/IUser';
import { LeavesService } from 'src/app/core/services/leaves.service';
import { MasterService } from 'src/app/core/services/master.service';
@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css'],
})
export class LeavesComponent implements OnInit, OnDestroy {
  @ViewChild('createLeaveFrm') createLeaveFrm!: NgForm;
  leaveObj: leaveObject;
  leavesArr: ILeaves[];
  filteredLeavesArr: ILeaves[];
  todaysDate: Date = new Date();
  displayModalLeaveDetails: boolean;
  displayModalCreateLeave: boolean;
  loggedInUserData: any;
  isApiCallInProgress: boolean;
  isApiCallInProgressApprove: boolean;
  isApiCallInProgressDeny: boolean;
  pendingLeavesCount: number;
  filteredPendingLeavesArr: ILeaves[];
  showPendingLeaves: boolean;
  items: any[];
  first: number;
  rows: number;
  itemColors: { [key: string]: string } = {};
  subscription: Subscription[];

  constructor(private _masterSrv: MasterService, private _leaveSrv: LeavesService, private router: Router, private toastr: ToastrService, private confirm: ConfirmationService, private cdr: ChangeDetectorRef) {
    this.leaveObj = new leaveObject();
    this.leavesArr = [];
    this.filteredLeavesArr = [];
    let localData = sessionStorage.getItem('loginUserData');
    if (localData != null) {
      this.loggedInUserData = JSON.parse(localData);
    };
    this._masterSrv.showLoader.next(false);
    this.displayModalLeaveDetails = false;
    this.displayModalCreateLeave = false;
    this.isApiCallInProgress = false;
    this.isApiCallInProgressApprove = false;
    this.isApiCallInProgressDeny = false;
    this.pendingLeavesCount = this.leavesArr.length;
    this.filteredPendingLeavesArr = [];
    this.showPendingLeaves = false;
    this.items = [];
    this.first = 0;
    this.rows = 6;
    this.subscription = [];
    this._masterSrv.showLoader.next(false);
    this._masterSrv.setShowSearch(true);
    this._masterSrv.search.subscribe((res: any) => {
      this.filteredLeavesArr = this.leavesArr.filter((searchData: any) => {
        let search = res.toLowerCase();
        const values = Object.values(searchData);
        let flag = false;
        for (let val of values) {
          if (val !== null && (val as string).toString().toLowerCase().indexOf(search) > -1) {
            flag = true;
            break;
          }
        }
        return flag;
      });
    });
  }

  ngOnInit(): void {
    this.loadLeavesByRoles();
    this.items = [
      {
        label: 'Show All Leaves', icon: 'pi pi-refresh', command: () => {
          this.showPendingLeaves = false;
          this.loadLeavesByRoles();
        }
      }
    ];
  }

  loadLeavesByRoles() {
    if (this.loggedInUserData.role == 'Super Admin') {
      this.loadAllLeaves();
    } else if (this.loggedInUserData.role == 'Employee') {
      this.loadAllLeavesByEmployeeId();
    } else if (this.loggedInUserData.role == 'Department Head') {
      this.loadLeavesForApprovalBySuperwiserId();
    } else if (this.loggedInUserData.role == 'Admin Department Employee') {
      this.loadAllLeavesByEmployeeId();
    }
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  loadAllLeaves() {
    this._masterSrv.showLoader.next(true);
    const getAllLeaves = this._leaveSrv.getAllLeaves().subscribe((res: any) => {
      if (res.result) {
        this._masterSrv.showLoader.next(false);
        this.leavesArr = res.data;
        this.filteredLeavesArr = res.data;
        this.setRandomColorsForAllItems();
      } else {
        this._masterSrv.showLoader.next(false);
      }
    }, (err: any) => {
      this._masterSrv.showLoader.next(false);
    });
    this.subscription.push(getAllLeaves);
  }

  loadAllLeavesByEmployeeId() {
    this._masterSrv.showLoader.next(true);
    const getAllLeavesByEmployeeId = this._leaveSrv.getAllLeavesByEmployeeId(this.loggedInUserData.employeeId).subscribe((res: any) => {
      if (res.result) {
        this._masterSrv.showLoader.next(false);
        this.leavesArr = res.data;
        this.filteredLeavesArr = res.data;
        this.setRandomColorsForAllItems();
      } else {
        this._masterSrv.showLoader.next(false);
      }
    }, (err: any) => {
      this._masterSrv.showLoader.next(false);
    });
    this.subscription.push(getAllLeavesByEmployeeId);
  }

  loadLeavesForApprovalBySuperwiserId() {
    this._masterSrv.showLoader.next(true);
    const getLeavesForApprovalBySuperwiserId = this._leaveSrv.getLeavesForApprovalBySuperwiserId(this.loggedInUserData.employeeId).subscribe((res: any) => {
      if (res.result) {
        this._masterSrv.showLoader.next(false);
        this.leavesArr = res.data;
        this.filteredLeavesArr = res.data;
        this.setRandomColorsForAllItems();
      } else {
        this._masterSrv.showLoader.next(false);
      }
    }, (err: any) => {
      this._masterSrv.showLoader.next(false);
    });
    this.subscription.push(getLeavesForApprovalBySuperwiserId);
  }

  openLeaveDetails(leaves: leaveObject) {
    this.displayModalLeaveDetails = true;
    this.leaveObj = leaves;
  }

  closeLeaveDetails() {
    this.displayModalLeaveDetails = false;
  }

  openCreateLeaveModal() {
    this.displayModalCreateLeave = true;
    this.leaveObj = new leaveObject();
  }

  onCreateLeave() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this.leaveObj.employeeId = this.loggedInUserData.employeeId;
      const addLeave = this._leaveSrv.addLeave(this.leaveObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success('Applied For Leave Successfully');
          this.onResetLeave();
          this.loadLeavesByRoles();
        } else {
          this.isApiCallInProgress = false;
          this.toastr.error(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.success(err.message);
      });
      this.subscription.push(addLeave);
    }
  }

  // approveLeave(leaveId: number) {
  //   this.confirm.confirm({
  //     message: 'Are you sure that you want to approve this leave request?',
  //     accept: () => {
  //       if (!this.isApiCallInProgressApprove) {
  //         this.isApiCallInProgressApprove = true;
  //         const approveLeave = this._leaveSrv.approveLeave(leaveId).subscribe((res: any) => {
  //           if (res.result) {
  //             this.isApiCallInProgressApprove = false;
  //             this.toastr.success(res.message);
  //             this.loadLeavesByRoles();
  //           } else {
  //             this.isApiCallInProgressApprove = false;
  //             this.toastr.error(res.message);
  //           }
  //         }, (err: any) => {
  //           this.isApiCallInProgressApprove = false;
  //           this.toastr.error(err.message);
  //         });
  //           this.subscription.push(approveLeave);
  //       }
  //     }
  //   });
  // }

  // denyLeave(leaveId: number) {
  //   this.confirm.confirm({
  //     message: 'Are you sure that you want to reject this leave request?',
  //     accept: () => {
  //       if (!this.isApiCallInProgressDeny) {
  //         this.isApiCallInProgressDeny = true;
  //         const rejectLeave = this._leaveSrv.rejectLeave(leaveId).subscribe((res: any) => {
  //           if (res.result) {
  //             this.isApiCallInProgressDeny = false;
  //             this.toastr.error(res.message);
  //             this.loadLeavesByRoles();
  //           } else {
  //             this.isApiCallInProgressDeny = false;
  //             this.toastr.error(res.message);
  //           }
  //         }, (err: any) => {
  //           this.isApiCallInProgressDeny = false;
  //           this.toastr.error(err.message);
  //         });
  //           this.subscription.push(rejectLeave);
  //       }
  //     }
  //   });
  // }

  getPendingLeavesCount() {
    return this.filteredLeavesArr.filter((count: any) => count.approvedDate == null).length;
  }

  approveLeave(leaveId: number) {
    this.confirm.confirm({
      message: 'Are you sure that you want to approve this leave request?',
      accept: () => {
        if (!this.isApiCallInProgressApprove) {
          this.isApiCallInProgressApprove = true;
          const approveLeave = this._leaveSrv.approveLeave(leaveId).subscribe((res: any) => {
            if (res.result) {
              this.isApiCallInProgressApprove = false;
              this.toastr.success(res.message);
              if (this.showPendingLeaves) {
                // Update the leavesArr to reflect the approved leave
                const approvedLeaveIndex = this.filteredLeavesArr.findIndex(leave => leave.leaveId === leaveId);
                if (approvedLeaveIndex !== -1) {
                  this.filteredLeavesArr[approvedLeaveIndex].isApproved = true;
                }
              } else {
                this.loadLeavesByRoles();
              }
              // Update the filteredPendingLeavesArr
              this.filteredPendingLeavesArr = this.filteredLeavesArr.filter(leave => leave.isApproved === null);
            } else {
              this.isApiCallInProgressApprove = false;
              this.toastr.error(res.message);
            }
          }, (err: any) => {
            this.isApiCallInProgressApprove = false;
            this.toastr.error(err.message);
          });
          this.subscription.push(approveLeave);
        }
      }
    });
  }

  denyLeave(leaveId: number) {
    this.confirm.confirm({
      message: 'Are you sure that you want to approve this leave request?',
      accept: () => {
        if (!this.isApiCallInProgressDeny) {
          this.isApiCallInProgressDeny = true;
          const rejectLeave = this._leaveSrv.rejectLeave(leaveId).subscribe((res: any) => {
            if (res.result) {
              this.isApiCallInProgressDeny = false;
              this.toastr.error(res.message);
              if (this.showPendingLeaves) {
                // Update the leavesArr to reflect the approved leave
                const rejectedLeaveIndex = this.filteredLeavesArr.findIndex((leave) => leave.leaveId === leaveId);
                if (rejectedLeaveIndex !== -1) {
                  this.filteredLeavesArr[rejectedLeaveIndex].isApproved = true;
                }
              } else {
                this.loadLeavesByRoles();
              }
              // Update the filteredPendingLeavesArr
              this.filteredPendingLeavesArr = this.filteredLeavesArr.filter(leave => leave.isApproved === null);
            } else {
              this.isApiCallInProgressDeny = false;
              this.toastr.error(res.message);
            }
          }, (err: any) => {
            this.isApiCallInProgressDeny = false;
            this.toastr.error(err.message);
          });
          this.subscription.push(rejectLeave);
        }
      }
    });
  }

  filterPendingLeaves() {
    this.showPendingLeaves = true;
    this.filteredPendingLeavesArr = this.filteredLeavesArr.filter(leave => leave.isApproved === null);
  }

  onDateChange() {
    if (this.leaveObj.fromDate && this.leaveObj.toDate) {
      const from = new Date(this.leaveObj.fromDate);
      const to = new Date(this.leaveObj.toDate);
      const today = new Date();
      if (from <= today && to <= today) {
        // Reset noOfDays if fromDate or toDate is before today
        this.leaveObj.noOfDays = 0;
        this.leaveObj.fromDate = null;
        this.leaveObj.toDate = null;
      } else if (from <= to) {
        const diffInMilliseconds = Math.abs(to.getTime() - from.getTime());
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const { months, remainingDays } = this.getMonthsAndRemainingDays(from, to);
        const totalDays = months * 30 + remainingDays; // Assuming 30 days in a month for simplicity
        this.leaveObj.noOfDays = totalDays;
      } else {
        // Reset noOfDays if toDate is before fromDate
        this.leaveObj.noOfDays = 0;
      }
    }
  }

  formatDifference(days: number, months: number): { months: number, remainingDays: number } {
    let totalDays = months * 30 + days; // Assuming 30 days in a month for simplicity
    return { months, remainingDays: totalDays };
  }

  getMonthsAndRemainingDays(startDate: Date, endDate: Date): { months: number, remainingDays: number } {
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
    let remainingDays = 0;
    // Adjust months if the day of the month in the end date is earlier than the start date
    if (endDate.getDate() < startDate.getDate()) {
      months -= 1;
      // Calculate the remaining days by adding the days in the end month and subtracting the days in the start month
      remainingDays = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate() - startDate.getDate() + endDate.getDate();
    } else {
      remainingDays = endDate.getDate() - startDate.getDate();
    }
    return { months, remainingDays };
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onResetLeave() {
    this.createLeaveFrm.resetForm();
    this.displayModalCreateLeave = false;
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  setRandomColorForItem(item: any): void {
    const color = this.getRandomColor();
    this.itemColors[item.leaveId] = color;
  }

  setRandomColorsForAllItems(): void {
    this.filteredLeavesArr.forEach((item) => {
      this.setRandomColorForItem(item);
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((ele: any) => {
      ele.unsubscribe();
    });
  }

}
