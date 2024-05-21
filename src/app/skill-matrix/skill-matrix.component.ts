import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { EMPLOYEES } from './mock-data';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppConfig } from '../app.module';

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
  errorMessage: string = 'Loading....';
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

  displayedColumns: string[] = ['id', 'skill_name', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const sources = [
      this.http.get(`${AppConfig.apiBaseUrl}/skillmatrix`),
      this.http.get(`${AppConfig.apiBaseUrl}/roles`),
      this.http.get(`${AppConfig.apiBaseUrl}/menu`),
    ];

    forkJoin(sources).subscribe(
      (res) => {
        if (res) {
          this.data2 = res[0];
          this.roles = res[1];
          this.menus = res[2];
          this.dataSource = new MatTableDataSource<any>(this.data2);
          this.dataSource.paginator = this.paginator;
        }
        this.onload();
      },
      (error: any) => {
        this.errorMessage = error.message;
      }
    );
  }
  deleteRecord(record: any): void {
    const index = this.dataSource.data.indexOf(record);
    this.http
      .delete(
        `${AppConfig.apiBaseUrl}/skill/delete?param1=${record.id}&skillName=${record.skill_name}`
      )
      .subscribe(
        (res: any) => {
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
        },
        (error) => {
          console.error('Error deleting skill:', error);
        }
      );
  }

  onload() {
    this.roles.forEach((role: any) => {
      role.display_menu.forEach((menu: any) => {
        if (role.display_menu) {
          const value = `${menu} ${role.role_name}`;
          if (!this.all_selected_values.includes(value)) {
            this.all_selected_values.push(value);
          }
        }
      });
    });
    this.updateSelectedArrays();
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

    console.log(skillExists, '87');

    if (skillExists) {
      this.employees.push(newEmployeeData);

      this.http
        .post('${this.apiurl}/skill', newEmployeeData)
        .subscribe((result: any) => {
          this.data2 = result;
          this.dataSource = new MatTableDataSource<any>(this.data2);
        });
    } else {
      alert('already Exists skill');
    }
    this.newEmployee = { id: 0, skill_name: '', description: '' };
    //console.log(newEmployeeData);
  }

  onChange(value: string, event: any): void {
    const isChecked = event.checked;
    if (isChecked) {
      if (!this.all_selected_values.includes(value)) {
        this.all_selected_values.push(value);
      }
    } else {
      const index = this.all_selected_values.indexOf(value);
      if (index !== -1) {
        this.all_selected_values.splice(index, 1);
      }
    }
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

  areAllMenusSelected(role: any): boolean {
    return this.menus.every((menu: any) =>
      this.isMenuAssigned(role.role_name, menu.menu_name)
    );
  }

  toggleAllMenus(role: any, event: any): void {
    const isChecked = event.checked;
    this.menus.forEach((menu: any) => {
      const value = `${menu.menu_name} ${role.role_name}`;
      if (isChecked && !this.all_selected_values.includes(value)) {
        this.all_selected_values.push(value);
      } else if (!isChecked && this.all_selected_values.includes(value)) {
        const index = this.all_selected_values.indexOf(value);
        if (index !== -1) {
          this.all_selected_values.splice(index, 1);
        }
      }
    });
    this.updateSelectedArrays();
  }

  isIndeterminate(role: any): boolean {
    const assignedMenus = this.menus.filter((menu: any) =>
      this.isMenuAssigned(role.role_name, menu.menu_name)
    );
    return assignedMenus.length > 0 && assignedMenus.length < this.menus.length;
  }

  updateSelectedArrays(): void {
    this.arr1 = [];
    this.arr2 = [];
    this.all_selected_values.forEach((element) => {
      if (element.includes(' Admin') && !this.arr1.includes(element)) {
        this.arr1.push(element);
      } else if (
        element.includes('Employee') &&
        !this.arr2.includes(element) &&
        !element.includes('undefined')
      ) {
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
      .post(
        `${AppConfig.apiBaseUrl}/update/roles?param1=${role1}`,
        modifiedData
      )
      .subscribe((result: any) => {});
    this.http
      .post(
        `${AppConfig.apiBaseUrl}/update/roles?param1=${role2}`,
        modifiedData1
      )
      .subscribe((result: any) => {});

    alert('Roles was updated particular user');
  }
}
