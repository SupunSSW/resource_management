import { Component, OnInit } from '@angular/core';

import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dep',
  templateUrl: './edit-dep.component.html',
  styleUrls: ['./edit-dep.component.css']
})
export class EditDepComponent implements OnInit {

  constructor( public dialogBox: MatDialogRef<EditDepComponent>, public service : DepartmentService, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogBox.close();
    this.service.filter('Register click');
  }

  onSubmit(form : NgForm) {
    this.service.updateDepartment(form.value).subscribe(res => {
      // this.resetForm(form);
      this.snackBar.open(res.toString(),'', {
        duration: 5000,
        verticalPosition:'top'
      });
      this.dialogBox.close();
      this.service.filter('Register click');
    });
  }

}
