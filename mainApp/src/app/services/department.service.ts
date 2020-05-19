import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Department } from '../models/department-model';
import { HttpClient } from '@angular/common/http';

// import { HttpClient } from 

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor( private http: HttpClient) { }

  formData : Department;

  readonly ApiUrl = "https://localhost:44359/api";

  getDepList() : Observable<Department[]> {
    return this.http.get<Department[]>(this.ApiUrl + "/department");
  }

  addDepartment(dep : Department) {
    return this.http.post(this.ApiUrl+"/department", dep);
  }

  deleteDepartment(id : number) {
    return this.http.delete(this.ApiUrl+"/department/" + id.toString());
  }

  updateDepartment(dep : Department) {
    return this.http.put(this.ApiUrl + '/department', dep);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy:string) {
    this._listeners.next(filterBy);
  }
}
