import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/springboot-crud-rest/api/v1/employees";

  constructor(private httpClient: HttpClient) { }

  getEmployeesList(id: number): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  createEmployee(employee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }
  
  updateSaldo(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/update-saldo/${id}`, employee);
  }
  
  login(employee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.baseURL}/login`, employee);
  }
  
  logout(id: number): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/logout/${id}`, id);
  }
  
  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
