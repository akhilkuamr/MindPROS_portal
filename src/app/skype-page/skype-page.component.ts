import { Component } from '@angular/core';
import { DataService } from '../company-email-dashboard/DataService';

@Component({
  selector: 'app-skype-page',
  templateUrl: './skype-page.component.html',
  styleUrl: './skype-page.component.css',
})
export class SkypePageComponent {
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
