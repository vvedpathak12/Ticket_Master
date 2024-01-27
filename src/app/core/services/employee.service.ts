import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ticketMaster } from '../constant/constant';
import { createUpdateEmpObject } from '../models/classes/classes';
import { IEmployee, IEmployeeById } from '../models/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(this.apiUrl + ticketMaster.empApiEndPoint.GetAllRoles).pipe(map((res: any) => res.data));
  }

  getAllEmployees(): Observable<IEmployee[]> {
    return this.http.get<{ data: IEmployee[] }>(this.apiUrl + ticketMaster.empApiEndPoint.GetEmployees).pipe(map((res: any) => res.data));
  }

  getEmployeeById(empId: number): Observable<IEmployeeById[]> {
    return this.http.get<IEmployeeById[]>(this.apiUrl + ticketMaster.empApiEndPoint.GetEmployeeById + empId);
  }

  getEmployeesByDeptId(deptId: number): Observable<IEmployeeById[]> {
    return this.http.get<{ data: IEmployeeById[] }>(this.apiUrl + ticketMaster.empApiEndPoint.GetEmployeesByDeptId + deptId).pipe(map((res: any) => res.data));
  }

  createEmployee(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + ticketMaster.empApiEndPoint.CreateEmployee, obj);
  }

  updateEmployee(obj: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + ticketMaster.empApiEndPoint.UpdateEmployee, obj);
  }

  deleteEmployee(empId: number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl + ticketMaster.empApiEndPoint.DeleteEmployee + empId);
  }
}
