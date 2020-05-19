import { Component, OnInit, NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee.service';
import { element } from 'protractor';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  constructor( public dialogBox: MatDialogRef<AddEmpComponent>, public service : EmployeeService, private snackBar: MatSnackBar ) { }

  public listItems: Array<string> = [];

  ngOnInit(): void {
    this.resetForm();
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
    this.service.addEmployee(form.value).subscribe(res => {
      this.resetForm(form);
      this.snackBar.open(res.toString(),'', {
        duration: 5000,
        verticalPosition:'top'
      });
    });
  }

}
