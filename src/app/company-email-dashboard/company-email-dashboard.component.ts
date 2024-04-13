import { Component } from '@angular/core';
import { DataService } from './DataService';
@Component({
  selector: 'app-company-email-dashboard',
  templateUrl: './company-email-dashboard.component.html',
  styleUrl: './company-email-dashboard.component.css',
})
export class CompanyEmailDashboardComponent {
  data: any;
  data1: any;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
      console.log(this.data);
    });
    this.dataService.get().subscribe((response) => {
      this.data1 = response;
      console.log(this.data1);
    });
  }
}
