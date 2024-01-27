import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ticketMaster } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  getSuperAdminDashboard(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + ticketMaster.dashboardApiEndPoint.GetSuperAdminDashboard);
  }

  getEmployeeDashByEmpId(empId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + ticketMaster.dashboardApiEndPoint.getEmployeeDashByEmpId + empId);
  }

  getAdminEmployeeDashByEmpId(empId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + ticketMaster.dashboardApiEndPoint.getAdminEmployeeDashByEmpId + empId);
  }

  getDeptHeadDashboardByDeptHead(deptHeadEmpId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + ticketMaster.dashboardApiEndPoint.GetDeptHeadDashboardByDeptHead + deptHeadEmpId);
  }
}
