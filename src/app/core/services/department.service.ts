import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ticketMaster } from '../constant/constant';
import { Observable, map } from 'rxjs';
import { createUpdateDepartment } from '../models/classes/classes';
import { IDepartment } from '../models/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<IDepartment[]> {
    return this.http.get<{data:IDepartment[]}>(this.apiUrl + ticketMaster.departmentApiEndPoint.GetDepartments).pipe(map((res:any)=> res.data));
  }

  createDepartment(obj: createUpdateDepartment): Observable<createUpdateDepartment> {
    return this.http.post<createUpdateDepartment>(this.apiUrl + ticketMaster.departmentApiEndPoint.CreateDepartment, obj);
  }

  updateDepartment(obj: createUpdateDepartment): Observable<createUpdateDepartment> {
    return this.http.put<createUpdateDepartment>(this.apiUrl + ticketMaster.departmentApiEndPoint.UpdateDepartment, obj);
  }

  deleteDepartment(deptId: number): Observable<IDepartment[]> {
    return this.http.delete<IDepartment[]>(this.apiUrl + ticketMaster.departmentApiEndPoint.DeleteDepartment + deptId);
  }
}
