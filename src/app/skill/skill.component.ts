import { HttpClient } from '@angular/common/http';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { EMPLOYEES } from './mock-data';
import { isPlatformBrowser } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { AppConfig } from '../app.module';
import { MatPaginator } from '@angular/material/paginator';

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
  private apiurl = AppConfig.apiBaseUrl;

  newEmployee = {
    user_id: '',
    id: 0,
    skill_name: '',
    YOE: '',
    rating: '',
  };
  displayedColumns: string[] = ['id', 'skill_name', 'YOE', 'rating', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.counter = localStorage.getItem('user');
      this.http
        .get(`${this.apiurl}/fetchdata?param1=${this.counter}`)
        .subscribe((res: any) => {
          this.data1 = res;
          this.http
            .get(`${this.apiurl}/skillmatrix/getdata?param1=${res._id}`)
            .subscribe((res: any) => {
              this.data2 = res;
              this.dataSource = new MatTableDataSource<any>(this.data2);
            });
        });
    }
    this.http.get(`${this.apiurl}/skillmatrix`).subscribe((result: any) => {
      this.data = result;
    });
  }

  deleteItem(employee: any) {
    const index = this.dataSource.data.indexOf(employee);
    this.http
      .delete(
        `${this.apiurl}/skillmatrix/delete?param1=${this.data1._id}&skillName=${employee.skill_name}`
      )
      .subscribe((res) => {
        this.dataSource.data.splice(index, 1);
        this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      });
  }

  addEmployee() {
    const newId = this.data2.length + 1;
    if (this.newEmployee.skill_name) {
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
          .post(`${this.apiurl}/skillmatrix1`, newEmployeeData)
          .subscribe((result: any) => {
            this.data2 = result;
            this.dataSource = new MatTableDataSource<any>(this.data2);
          });
      } else {
        alert('already Exists skill');
      }

      this.newEmployee = {
        user_id: ' ',
        id: 0,
        skill_name: '',
        YOE: '',
        rating: '',
      };
    } else {
      alert('Enter the Skill Name, YOE and Rating Required  ');
    }
  }
}
