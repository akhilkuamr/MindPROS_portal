import { Component, Input, OnInit } from '@angular/core';
import { EMPLOYEES } from './mock-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-skill-matrix',
  templateUrl: './skill-matrix.component.html',
  styleUrl: './skill-matrix.component.css',
})
export class SkillMatrixComponent implements OnInit {
  public selectedFilter: string;
  data2: any = [];
  roles: any = [];
  menus: any = [];
  arr1: any = [];
  arr2: any = [];
  all_selected_values: any[] = [];
  public filterTypes = [
    { value: 'release', display: 'Menu management' },
    { value: 'terminated', display: 'Skills' },
  ];

  employees = EMPLOYEES;
  newEmployee = {
    id: 0,
    skill_name: '',
    description: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/skillmatrix')
      .subscribe((result: any) => {
        this.data2 = result;
      });
    this.http.get('http://localhost:3000/roles').subscribe((result: any) => {
      this.roles = result;
    });
    this.http.get('http://localhost:3000/menu').subscribe((result: any) => {
      this.menus = result;
    });
  }

  addEmployee() {
    const newId = this.data2.length + 1;
    const newEmployeeData = {
      id: newId,
      skill_name: this.newEmployee.skill_name,
      description: this.newEmployee.description,
    };
    const skillExists = !this.data2.some(
      (item: { skill_name: string }) =>
        item.skill_name === this.newEmployee.skill_name
    );

    if (skillExists) {
      this.employees.push(newEmployeeData);

      this.http
        .post('http://localhost:3000/skill', newEmployeeData)
        .subscribe((result: any) => {
          this.data2 = result;
        });
    } else {
      alert('already Exists skill');
    }
    this.newEmployee = { id: 0, skill_name: '', description: '' };
    console.log(newEmployeeData);
  }

  onChange(value: string): void {
    if (this.all_selected_values.includes(value)) {
      this.all_selected_values = this.all_selected_values.filter(
        (item) => item !== value
      );
    } else {
      this.all_selected_values.push(value);
    }

    console.log(this.all_selected_values);
    this.all_selected_values.forEach((element) => {
      if (element.indexOf('Admin') >= 0 && !this.arr1.includes(element)) {
        this.arr1.push(element);
      } else if (
        element.indexOf('Employer') >= 0 &&
        !this.arr2.includes(element)
      ) {
        this.arr2.push(element);
      }
    });
  }

  displayData() {
    alert('Roles was updated particular user');
  }
}
