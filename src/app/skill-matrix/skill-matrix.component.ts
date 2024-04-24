import { Component, Input, OnInit } from '@angular/core';
import { EMPLOYEES } from './mock-data';
import { HttpClient } from '@angular/common/http';
import { __values } from 'tslib';

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
    //console.log(newEmployeeData);
  }

  onChange(value: string, event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      if (!this.all_selected_values.includes(value)) {
        this.all_selected_values.push(value);
      }
    } else {
      // If the checkbox is unchecked, remove the value from the array
      const index = this.all_selected_values.indexOf(value);
      if (index !== -1) {
        this.all_selected_values.splice(index, 1);
      }
    }
    //   if (element.indexOf('Admin') >= 0 && !this.arr1.includes(element)) {
    //     this.arr1.push(element);
    //   } else if (
    //     element.indexOf('Employee') >= 0 &&
    //     !this.arr2.includes(element)
    //   ) {
    //     this.arr2.push(element);
    //   }
    // });
    this.updateSelectedArrays();
  }

  mainCheckboxChanged(role: any, event: any) {
    role.display_menu.forEach((menu: any) => {
      menu.checked = event.target.checked;
    });
    this.updateSelectedArrays();
  }

  isMenuAssigned(roleName: string, menuName: string): boolean {
    const filter = this.roles.find((item: any) => item.role_name === roleName);
    if (filter !== undefined) {
      const result = filter.display_menu.includes(menuName);
      return result;
    } else {
      return false;
    }
  }

  private updateSelectedArrays(): void {
    this.arr1 = [];
    this.arr2 = [];
    this.all_selected_values.forEach((element) => {
      if (element.includes('Admin') && !this.arr1.includes(element)) {
        this.arr1.push(element);
      } else if (element.includes('Employee') && !this.arr2.includes(element)) {
        this.arr2.push(element);
      }
    });
  }

  displayData() {
    const role1: String = 'Admin';
    const role2: String = 'Employee';
    const modifiedData = this.arr1.map((item: String) =>
      item.replace(' Admin', '')
    );
    const modifiedData1 = this.arr2.map((item: String) =>
      item.replace(' Employee', '')
    );
    this.http
      .post(`http://localhost:3000/update/roles?param1=${role1}`, modifiedData)
      .subscribe((result: any) => {});
    this.http
      .post(`http://localhost:3000/update/roles?param1=${role2}`, modifiedData1)
      .subscribe((result: any) => {});

    alert('Roles was updated particular user');
  }
}
