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
}
