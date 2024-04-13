import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  data: any = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/customers')
      .subscribe((result: any) => {
        this.data = result;
      });
  }
}
