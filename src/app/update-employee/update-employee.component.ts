import { Component, OnInit } from '@angular/core';
import { Employee } from '../Model/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../Service/http.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{

  public employee: Employee = new Employee();
  employeeForm! :FormGroup
  id: number = 0;

  departments: Array<any> = [
    { id: 1, name: "HR", value: "HR", checked: false },
    { id: 2, name: "Sales", value: "Sales", checked: false },
    { id: 3, name: "Finance", value: "Finance", checked: false  },
    { id: 4, name: "Engineer", value: "Engineer", checked: false },
    { id: 5, name: "Other", value: "Other", checked: false }
  ]

  constructor(private route: ActivatedRoute,private router: Router, private formBuilder: FormBuilder,
    private httpService: HttpService) { 
    
    }

  ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params['id'];
    
    this.httpService.getEmployee(this.id)
      .subscribe(response => {
        console.log(response.data)
        this.employee = response.data;
        console.log(this.employee.name)
      });
  }


  salary: number = 400000;
  updateSetting(event: any) {
    this.salary = event.target.value;
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onDepartmentChange(event: any){
    const departmentValue = event.target.value
    const selectedDepartment = event.target.checked
    const departmentArray: FormArray = this.employeeForm.get('department') as FormArray;

    if (selectedDepartment) {
      departmentArray.push(new FormControl(departmentValue));
    } else {
      const index = departmentArray.controls.findIndex(x => x.value === departmentValue);
      departmentArray.removeAt(index);
    }
  }

  updateEmployee() {
    console.log(this.employee)
    this.httpService.updateEmployeeData(this.id, this.employee)
      .subscribe(data => {
        console.log(data);
        this.employee = new Employee();
        this.gotoList();
      }); 
  }

  onSubmit() {
    this.updateEmployee();    
  }

  gotoList() {
    this.router.navigate(['']);
  }

}
