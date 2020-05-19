import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from 'src/app/services/department.service';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDepComponent } from '../add-dep/add-dep.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDepComponent } from '../edit-dep/edit-dep.component';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor( private service: DepartmentService, private dialog : MatDialog, private snackBar: MatSnackBar) { 
    this.service.listen().subscribe((m:any) => {
      this.refreshDepList();
    })
  }

  listData : MatTableDataSource<any>;
  displayColumns : string[] = ['Options', 'DepartmentID', 'DepartmentName'];

  @ViewChild(MatSort) sort: MatSort;


  ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList() {
    this.service.getDepList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    })
  }

  onEdit(dep : Department) {
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditDepComponent, dialogConfig);
  }

  onDelete(id : number) {
    if(confirm("Are you sure?")){
      this.service.deleteDepartment(id).subscribe(res => {
        this.refreshDepList();
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
    this.dialog.open(AddDepComponent, dialogConfig);
  }

}
