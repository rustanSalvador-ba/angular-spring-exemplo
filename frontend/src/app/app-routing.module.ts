import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { UpdateSaldoComponent } from './update-saldo/update-saldo.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'employees/:id', component: EmployeeListComponent},
  {path: 'employees', component: EmployeeListComponent},
  {path: 'create-employee/:id', component: CreateEmployeeComponent},
  {path: 'create-employee', component: CreateEmployeeComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'update-employee/:id/:id_user', component: UpdateEmployeeComponent},
  {path: 'employee-details/:id/:id_user', component: EmployeeDetailsComponent},
  {path: 'update-saldo/:id/:id_user', component: UpdateSaldoComponent},
  {path: 'login', component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],                                                                                                                                                                                                                                                                                                          
  exports: [RouterModule]
})

export class AppRoutingModule { }