import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ticketMaster } from '../constant/constant';
import { Observable } from 'rxjs';
import { createNewTicketObject } from '../models/classes/classes';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + ticketMaster.ticketApiEndPoint.GetAllTickets);
  }

  getTicketById(ticketId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + ticketMaster.ticketApiEndPoint.GetTicketById + ticketId);
  }

  getNewTickets(deptHeadEmpId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + ticketMaster.ticketApiEndPoint.getNewTickets + deptHeadEmpId)
  }

  getTicketsCreatedByEmpId(empId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + ticketMaster.ticketApiEndPoint.GetTicketsCreatedByEmpId + empId);
  }

  getAssignedTicketsByEmpId(empId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + ticketMaster.ticketApiEndPoint.GetAssignedTicketsByEmpId + empId);
  }

  createNewTicket(obj: createNewTicketObject): Observable<createNewTicketObject> {
    return this.http.post<createNewTicketObject>(this.apiUrl + ticketMaster.ticketApiEndPoint.CreateNewTicket, obj);
  }

  deleteTicket(ticketId: number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl + ticketMaster.ticketApiEndPoint.DeleteTicket + ticketId);
  }

  getRequestByFilter(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + ticketMaster.ticketApiEndPoint.GetRequestByFilter, obj);
  }

  assignRequest(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + ticketMaster.ticketApiEndPoint.AssignRequest, obj);
  }

  startTicket(id: number): Observable<any> {
    return this.http.post<any>(this.apiUrl + ticketMaster.ticketApiEndPoint.startTicket + id, {});
  }

  closeTicket(id: number): Observable<any> {
    return this.http.post<any>(this.apiUrl + ticketMaster.ticketApiEndPoint.closeTicket + id, {});
  }
}
