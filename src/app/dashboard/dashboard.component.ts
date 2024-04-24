import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  data: any; //store customers data
  data1: any; // store roles data
  data2: any; // store filtered data in particular filed data
  id_data: any; // storing session data
  counter: any; //getting from session stroage
  filteredData: any; //filtered roles data
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.counter = localStorage.getItem('user');
      this.http
        .get(`http://localhost:3000/fetchdata?param1=${this.counter}`)
        .subscribe((res: any) => {
          this.id_data = res;
        });
    }
    this.http
      .get('http://localhost:3000/customers')
      .subscribe((result: any) => {
        this.data = result;
      });
    this.http.get('http://localhost:3000/roles').subscribe((result: any) => {
      this.data1 = result;
      this.admin();
    });
  }

  admin() {
    this.filteredData = this.data1.filter(
      (item: any) => item.role_name == this.id_data.Role
    );
    this.data2 = this.filteredData[0].display_menu;
  }
}
