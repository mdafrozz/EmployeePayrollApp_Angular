import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../Service/http.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{

  id: number;
  employee: Employee;

  constructor(private route: ActivatedRoute,private router: Router,
    private httpService: HttpService) { }

  ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params['id'];
    
    this.httpService.getEmployee(this.id)
      .subscribe(data => {
        console.log(data)
        this.employee = data;
      });
  }

  updateEmployee() {
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
