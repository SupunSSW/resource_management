import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../models/employee-model';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/department-model';

// import { HttpClient } from 

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http: HttpClient) { }

  formData : Employee;

  readonly ApiUrl = "https://localhost:44359/api";

  getEmpList() : Observable<Employee[]> {
    return this.http.get<Employee[]>(this.ApiUrl + "/employee");
  }

  addEmployee(emp : Employee) {
    return this.http.post(this.ApiUrl+"/employee", emp);
  }

  deleteEmployee(id : number) {
    return this.http.delete(this.ApiUrl+"/employee/" + id.toString());
  }

  updateEmployee(emp : Employee) {
    return this.http.put(this.ApiUrl + '/employee', emp);
  }

  getDepartmentDropDownValues(): Observable<any>{
    return this.http.get<Department[]>(this.ApiUrl + '/department');
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy:string) {
    this._listeners.next(filterBy);
  }
}
