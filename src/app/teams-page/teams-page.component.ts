import { Component } from '@angular/core';
import { DataService } from '../company-email-dashboard/DataService';
@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrl: './teams-page.component.css',
})
export class TeamsPageComponent {
  data: any;

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
      console.log(this.data);
    });
    // this.dataService.get().subscribe((response) => {
    //   this.data1 = response;
    //   console.log(this.data1);
    // });
  }
}
