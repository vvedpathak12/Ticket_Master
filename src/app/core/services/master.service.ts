import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public search = new Subject<string>();
  public showLoader = new Subject<boolean>();
  public showInputSearch = new Subject<boolean>();
  randomPersonImageSrc: string = '';
  showSearch$ = this.showInputSearch.asObservable();


  constructor(private http: HttpClient) { }

  setShowSearch(show: boolean) {
    this.showInputSearch.next(show);
  }
}
