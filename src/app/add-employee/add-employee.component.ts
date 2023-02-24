import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { HttpService } from '../Service/http.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  public employee: Employee = new Employee();
  employeeForm! :FormGroup

  departments: Array<any> = [
    { id: 1, name: "HR", value: "HR", checked: false },
    { id: 2, name: "Sales", value: "Sales", checked: false },
    { id: 3, name: "Finance", value: "Finance", checked: false  },
    { id: 4, name: "Engineer", value: "Engineer", checked: false },
    { id: 5, name: "Other", value: "Other", checked: false }
  ]

  constructor(private formBuilder: FormBuilder, private router: Router, private httpService: HttpService){
    this.employeeForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
      profilePic: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      department: new FormArray([], Validators.required),
      startDate: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void{

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

  get formControls(){
    return this.employeeForm.controls
  }

  submitForm(){
    console.log(this.employeeForm.value)
    this.httpService.addEmployeeData(this.employeeForm.value).subscribe(response => {
      console.log(response)
      this.router.navigate([''])
    })

  }
}
