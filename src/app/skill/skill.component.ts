import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { EMPLOYEES } from './mock-data';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css',
})
export class SkillComponent implements OnInit {
  data: any = [];
  counter: any;
  data1: any = {};
  data2: any = [];
  employees = EMPLOYEES;

  newEmployee = {
    user_id: '',
    id: 0,
    skill_name: '',
    YOE: '',
    rating: '',
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.counter = localStorage.getItem('user');
      const sub = this.http
        .get(`http://3.218.140.109:3000/fetchdata?param1=${this.counter}`)
        .subscribe((res: any) => {
          this.data1 = res;
          this.http
            .get(`http://3.218.140.109:3000/skillmatrix/getdata?param1=${res._id}`)
            .subscribe((res: any) => {
              this.data2 = res;
            });
        });
    }
    this.http
      .get('http://3.218.140.109:3000/skillmatrix')
      .subscribe((result: any) => {
        this.data = result;
      });
  }

  addEmployee() {
    const newId = this.data2.length + 1;
    const newEmployeeData = {
      user_id: this.data1._id,
      id: newId,
      skill_name: this.newEmployee.skill_name,
      YOE: this.newEmployee.YOE,
      rating: this.newEmployee.rating,
    };

    const skillExists = !this.data2.some(
      (item: { skill_name: string }) =>
        item.skill_name === this.newEmployee.skill_name
    );

    if (skillExists) {
      this.employees.push(newEmployeeData);
      this.http
        .post('http://3.218.140.109:3000/skillmatrix1', newEmployeeData)
        .subscribe((result: any) => {
          this.data2 = result;
        });
    }

    this.newEmployee = {
      user_id: ' ',
      id: 0,
      skill_name: '',
      YOE: '',
      rating: '',
    };
  }
}
