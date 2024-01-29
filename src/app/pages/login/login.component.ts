import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { loginObject } from 'src/app/core/models/classes/classes';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginObj: loginObject;
  isApiCallInProgress: boolean;
  showPassword: boolean;
  rememberMe: boolean;
  subscription: Subscription[];

  constructor(private router: Router, private toastr: ToastrService, private _login: LoginService) {
    this.loginObj = new loginObject();
    this.isApiCallInProgress = false;
    this.showPassword = false;
    this.rememberMe = false;
    this.subscription = [];
    const rememberLoginInfo = sessionStorage.getItem('rememberLogin');
    if (rememberLoginInfo != null) {
      this.loginObj = JSON.parse(rememberLoginInfo);
      this.rememberMe = true;
    }
  }

  ngOnInit(): void {
  }

  login(loginFrm: NgForm) {
    if (loginFrm.valid) {
      if (!this.isApiCallInProgress) {
        this.isApiCallInProgress = true;
        const login = this._login.login(this.loginObj).subscribe((res: any) => {
          if (res.result) {
            this.isApiCallInProgress = false;
            sessionStorage.setItem('loginUserData', JSON.stringify(res.data));
            if (res.data.role == 'admin' || res.data.role == 'Admin' || res.data.role == 'Super Admin') {
              this.router.navigate(['/dashboard']);
              this.toastr.success('Logged In Successfully');
            } else if (res.data.role == 'employee' || res.data.role == 'Employee') {
              this.router.navigate(['/dashboard']);
              this.toastr.success('Logged In Successfully');
            } else if (res.data.role == 'Department Head' || res.data.role == 'department Head') {
              this.router.navigate(['/dashboard']);
              this.toastr.success('Logged In Successfully');
            } else if (res.data.role == 'Admin Department Employee') {
              this.router.navigate(['/dashboard']);
              this.toastr.success('Logged In Successfully');
            }
          } else {
            this.isApiCallInProgress = false;
            this.toastr.error('Wrong Credentials!!');
          }

          if (this.rememberMe == true) {
            sessionStorage.setItem('rememberLogin', JSON.stringify(this.loginObj));
          } else {
            sessionStorage.removeItem('rememberLogin')
          }
        }, (err: any) => {
          this.isApiCallInProgress = false;
          this.toastr.error('Wrong Credentials!!');
        });
        this.subscription.push(login);
      }
    } else {
      Object.values(loginFrm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onEyeClick() {
    this.showPassword = !this.showPassword;
  }

  onClearEmail() {
    this.loginObj.emailId = '';
  }

  ngOnDestroy(): void {
    this.subscription.forEach((ele: any) => {
      ele.unsubscribe();
    })
  }
}
