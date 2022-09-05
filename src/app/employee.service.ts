import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  BASE_URL = 'https://dummy.restapiexample.com/api/v1/employees';

  constructor(public httpClient: HttpClient) { }

  getAllEmployees() {
    return this.httpClient.get(this.BASE_URL);
  }

  saveEmployee(employee: any) {
    return this.httpClient.post(this.BASE_URL, employee)
  }

  updateEmployee(employee: any) {
    return this.httpClient.put(this.BASE_URL, employee)
  }

  deleteEmployee(employee: any) {
    return this.httpClient.delete(this.BASE_URL, employee)
  }
}
