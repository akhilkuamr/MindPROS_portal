import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { forkJoin } from 'rxjs';
import { AppConfig } from '../app.module';
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
  constructor(private http: HttpClient, private _auth: AuthServiceService) {}
  ngOnInit() {
    this.counter = this._auth.getToken1();
    const sources = [
      this.http.get(`${AppConfig.apiBaseUrl}/fetchdata?param1=${this.counter}`),
      this.http.get(`${AppConfig.apiBaseUrl}/customers`),
      this.http.get(`${AppConfig.apiBaseUrl}/roles`),
    ];

    forkJoin(sources).subscribe((res) => {
      // console.log(res);
      if (res) {
        this.id_data = res[0];
        this.data = res[1];
        this.data1 = res[2];
      }
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
