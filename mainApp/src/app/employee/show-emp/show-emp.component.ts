import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor( private service: EmployeeService, private dialog : MatDialog, private snackBar: MatSnackBar) { 
    this.service.listen().subscribe((m:any) => {
      this.refreshEmpList();
    })
  }

  listData : MatTableDataSource<any>;
  displayColumns : string[] = ['Options', 'EmployeeID', 'EmployeeName', 'Department', 'MailID', 'DOJ'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmpList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    })
  }

  onEdit(emp : Employee) {
    this.service.formData = emp;
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditEmpComponent, dialogConfig);
  }

  onDelete(id : number) {
    if(confirm("Are you sure?")){
      this.service.deleteEmployee(id).subscribe(res => {
        this.refreshEmpList();
        this.snackBar.open(res.toString(),'', {
          duration: 5000,
          verticalPosition:'top'
        });
      })
    }
  }

  applyFilter(keyword : string) {
    this.listData.filter = keyword.trim().toLowerCase();
  }

  onAddClick() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddEmpComponent, dialogConfig);
  }
}
