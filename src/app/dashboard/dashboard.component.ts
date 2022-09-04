import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor() { }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  saveEmployee() {

  }
}
