import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:8080/employeepayrollservice"

  getEmployeeData(): Observable<any> {
    return this.http.get(this.baseUrl + "/getall");
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/get/${id}`);
  }

  addEmployeeData(obj: any): Observable<any> {
    return this.http.post(this.baseUrl + "/create",obj);
  }

  deleteEmployeeData(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `/delete/${id}`);
  }

  updateEmployeeData(id: number, obj: any): Observable<any> {
    return this.http.put(this.baseUrl + `/update/${id}`, obj);
  }
}
