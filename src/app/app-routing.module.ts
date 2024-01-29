import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { DepartmentComponent } from './pages/department/department.component';
import { LoaderComponent } from './pages/loader/loader.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardComponent
      },
      {
        path: 'employee',
        title: 'Employee',
        component: EmployeeComponent
      },
      {
        path: 'department',
        title: 'Departments',
        component: DepartmentComponent
      },
      {
        path: 'new-ticket',
        title: 'Ticket Management',
        component: NewTicketComponent
      },
      {
        path: 'leaves',
        title: 'Leave Management',
        component: LeavesComponent
      }
    ]
  },
  {
    path: '**',
    title: 'Error 404 (Not Found)!!',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
