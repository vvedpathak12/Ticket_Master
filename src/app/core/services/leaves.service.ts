import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ticketMaster } from '../constant/constant';
import { leaveObject } from '../models/classes/classes';
import { ILeaves } from '../models/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  getAllLeaves(): Observable<ILeaves[]> {
    return this.http.get<ILeaves[]>(this.apiUrl + ticketMaster.leavesApiEndPoint.GetAllLeaves);
  }

  getAllLeavesByEmployeeId(empId: number): Observable<ILeaves[]> {
    return this.http.get<ILeaves[]>(this.apiUrl + ticketMaster.leavesApiEndPoint.GetAllLeavesByEmployeeId + empId);
  }

  getLeavesForApprovalBySuperwiserId(superwiserId: number): Observable<ILeaves[]> {
    return this.http.get<ILeaves[]>(this.apiUrl + ticketMaster.leavesApiEndPoint.GetLeavesForApprovalBySuperwiserId + superwiserId);//superwiserId means here Department Head Id
  }

  addLeave(obj: leaveObject): Observable<leaveObject> {
    return this.http.post<leaveObject>(this.apiUrl + ticketMaster.leavesApiEndPoint.AddLeave, obj);
  }

  approveLeave(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + ticketMaster.leavesApiEndPoint.ApproveLeave + id);
  }

  rejectLeave(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + ticketMaster.leavesApiEndPoint.RejectLeave + id);
  }
}
