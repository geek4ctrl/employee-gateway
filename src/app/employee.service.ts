import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // BASE_URL = 'https://dummy.restapiexample.com/api/v1/employees';   // Dummy URL
  BASE_URL = 'http://localhost:5000/api/v1/employees';                 // Real URL

  constructor(public httpClient: HttpClient) { }

  getAllEmployees() {
    return this.httpClient.get(this.BASE_URL);
  }

  saveEmployee(employee: any) {
    return this.httpClient.post(this.BASE_URL, employee)
  }

  updateEmployee(employee: any) {
    return this.httpClient.put(this.BASE_URL + '/' + employee.email, employee)
  }

  deleteEmployee(employeeId: any) {
    return this.httpClient.delete(this.BASE_URL + '/' + employeeId)
  }
}
