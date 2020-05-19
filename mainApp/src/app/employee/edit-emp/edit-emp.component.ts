import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {

  constructor( public dialogBox: MatDialogRef<EditEmpComponent>, public service : EmployeeService, private snackBar: MatSnackBar ) { }

  public listItems: Array<string> = [];

  ngOnInit(): void {
    this.dropdownRefresh();
  }
  
  dropdownRefresh(){
    this.service.getDepartmentDropDownValues().subscribe(data => {
      data.forEach(element => {
        this.listItems.push(element["DepartmentName"]);
      })
    })
  }

  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();

    this.service.formData = {
      EmployeeID:0,
      EmployeeName:'',
      Department:'',
      MailID:'',
      DOJ: null
    }
  }

  onClose() {
    this.dialogBox.close();
    this.service.filter('Register click');
  }

  onSubmit(form : NgForm) {
    this.service.updateEmployee(form.value).subscribe(res => {
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
