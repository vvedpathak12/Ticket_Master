import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { DepartmentComponent } from './pages/department/department.component';
import { HttpClientModule } from '@angular/common/http';
import { RadioButtonModule } from 'primeng/radiobutton';
import { LoaderComponent } from './pages/loader/loader.component';
import { CheckboxModule } from 'primeng/checkbox';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';
import { EditorModule } from 'primeng/editor';
import { HeaderComponent } from './pages/header/header.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { TooltipModule } from 'primeng/tooltip';
import { CardComponent } from './shared/components/card/card.component';
import { BadgeModule } from 'primeng/badge';
import { NaPipe } from './shared/pipes/na.pipe';
import { MoreLessComponent } from './shared/components/more-less/more-less.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { AvatarModule } from 'ngx-avatar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {PaginatorModule} from 'primeng/paginator';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    EmployeeComponent,
    DepartmentComponent,
    LoaderComponent,
    NewTicketComponent,
    HeaderComponent,
    SideBarComponent,
    CardComponent,
    NaPipe,
    MoreLessComponent,
    LeavesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    InputSwitchModule,
    InputTextareaModule,
    DropdownModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ToastModule,
    HttpClientModule,
    RadioButtonModule,
    CheckboxModule,
    EditorModule,
    TooltipModule,
    BadgeModule,
    AvatarModule,
    SplitButtonModule,
    PaginatorModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
