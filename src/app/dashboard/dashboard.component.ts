import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

interface Attribute {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allEmployees: any;
  totalNumberOfEmployees: number = 0;
  searchText: any = '';

  attributes: Attribute[] = [
    { value: 'year', viewValue: 'Year' },
    { value: 'skills', viewValue: 'Skills' },
  ];

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }

  @ViewChild('matSelect') matSelect: MatSelect | undefined;

  ngAfterViewInit() {
    this.matSelect?.valueChange.subscribe(value => {
      this.searchText = value;
    });
  }

  ngOnInit(): void {
    this.displayAllEmployees()
  }

  displayAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (result: any) => {
        this.allEmployees = result.employees;
        this.totalNumberOfEmployees = this.allEmployees.length;
      }
    )
  }

  showEmployee(employee: any) {
    this.openDialog(true, employee);
  }

  deleteEmployee(employeeId: any) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (result: any) => { }
    )

    location.reload();
  }

  openDialog(toUpdate = false, employee = null): void {
    const dialogRef = this.dialog.open(DashboardDialog, {
      width: '700px',
      data: { toUpdate: toUpdate, data: employee },
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public person: any,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService) { }

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

    if (this.person.data !== null) {

      this.registerForm.patchValue({
        firstName: this.person.data.firstName,
        lastName: this.person.data.lastName,
        email: this.person.data.email,
        contactNumber: this.person.data.contactNumber,
        dateOfBirth: this.person.data.dateOfBirth,
        streetAddress: this.person.data.streetAddress,
        city: this.person.data.city,
        postalCode: this.person.data.postalCode,
        country: this.person.data.country,
      })

    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  save() {
    if (this.person.toUpdate) {
      this.updateEmployee(this.registerForm.value);
    } else {
      this.saveEmployee();
    }
  }

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
    );

    location.reload();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
