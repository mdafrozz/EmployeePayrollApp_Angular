import { Component, OnInit } from '@angular/core';
import { Employee } from '../Model/employee';
import { HttpService } from '../Service/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  employeeCount: number = 0;
  employeeList: Employee[] = []

  
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(response => {
      console.log(response)
      this.employeeList = response
      this.employeeCount = this.employeeList.length
    })
  }

  deleteEmployee(id: number){
    console.log(id)
    this.httpService.deleteEmployeeData(id)
    .subscribe(
      data => {
        window.location.reload();
      })
  }

  updateEmployee(id: number){
    this.router.navigate(['update', id]);
  }

}
