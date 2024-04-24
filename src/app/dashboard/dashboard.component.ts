import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  data: any;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get('http://localhost:3000/customers')
      .subscribe((result: any) => {
        this.data = result;
      });
  }

  check() {
    if (this.data.Role === 'Employee') return true;
    else return false;
  }
}
