import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginObject } from '../models/classes/classes';
import { Observable, Subject } from 'rxjs';
import { ticketMaster } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  login(obj: loginObject): Observable<loginObject> {
    return this.http.post<loginObject>(this.apiUrl + ticketMaster.loginApiEndPoint.Login, obj);
  }
}
