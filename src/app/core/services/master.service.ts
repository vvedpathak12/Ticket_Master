import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public search = new Subject<string>();
  public showLoader = new Subject<boolean>();
  public showInputSearch = new Subject<boolean>();
  showSearch$ = this.showInputSearch.asObservable();

  private onlineStatusSubject = new BehaviorSubject<boolean>(navigator.onLine);
  onlineStatus$ = this.onlineStatusSubject.asObservable();


  constructor(private http: HttpClient, private ngZone: NgZone) {
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  setShowSearch(show: boolean) {
    this.showInputSearch.next(show);
  }

  private updateOnlineStatus() {
    this.ngZone.run(() => {
      this.onlineStatusSubject.next(navigator.onLine);
    });
  }
}
