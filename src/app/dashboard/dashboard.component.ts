import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      (employees: any) => {
        this.allEmployees = employees.data;
        this.totalNumberOfEmployees = this.allEmployees.length

        console.log('Show me all the employees: ', this.allEmployees)
      }
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DashboardDialog, {
      width: '700px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}

@Component({
  selector: 'dashboard-dialog',
  templateUrl: 'dashboard-dialog.html',
})
export class DashboardDialog {
  employeeForm: any;
  submitted = false;

  constructor() { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      contactNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
      emailAddress: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dateOfBirth: new FormControl('', [Validators.required, Validators.minLength(4)]),
      streetAddress: new FormControl('', [Validators.required, Validators.minLength(2)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2)]),
      postalCode: new FormControl('', [Validators.required, Validators.minLength(2)]),
      country: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  saveEmployee() {
    this.submitted = true;


  }
}
