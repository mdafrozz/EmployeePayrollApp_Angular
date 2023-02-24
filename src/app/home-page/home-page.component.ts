import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { HttpService } from '../Service/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  employeeCount: number = 0;
  employeeList: Employee[] = []

  
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(response => {
      console.log(response)
      this.employeeList = response
      this.employeeCount = this.employeeList.length
    })
  }

  deleteEmployee(id: number){
    this.httpService.deleteEmployeeData(id)
    .subscribe(
      data => {
        window.location.reload();
      })
  }

  updateEmployee(id: number){
    this.httpService.updateEmployeeData(id)
    .subscribe(
      data => {
        window.location.reload();
      })
  }

}
