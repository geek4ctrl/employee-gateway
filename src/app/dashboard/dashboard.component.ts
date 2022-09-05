import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allEmployees: any;
  totalNumberOfEmployees: number = 0;
  searchText: any = '';

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.displayAllEmployees()
  }

  displayAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (result: any) => {
        this.allEmployees = result.employees;
        this.totalNumberOfEmployees = this.allEmployees.length

        console.log('Show me all the employees: ', this.allEmployees)
      }
    )
  }

  deleteEmployee(employeeId: any) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (result: any) => {
        console.log('Show me the result here: ', result)
      }
    )

    location.reload();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DashboardDialog, {
      width: '700px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dashboard-dialog',
  templateUrl: 'dashboard-dialog.component.html',
  styleUrls: ['./dashboard-dialog.component.css']
})
export class DashboardDialog {
  registerForm: any;
  submitted = false;
  employee: any;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  saveEmployee() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    alert('User registered successfully!');
    this.employee = this.registerForm.value;

    this.employeeService.saveEmployee(this.employee).subscribe(
      (result: any) => {
        console.log('Show me the result here: ', result)
      }
    );

    location.reload();
  }

  updateEmployee(employee: any) {
    this.employeeService.updateEmployee(employee).subscribe(
      (result: any) => {
        console.log('Show me the result here: ', result)
      }
    )
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
