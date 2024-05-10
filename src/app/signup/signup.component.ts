import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { json } from 'stream/consumers';
import { response } from 'express';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private http: HttpClient) {}

  onSubmit(userForm: any) {
    let userData = {
      First_name: userForm.value.first_name,
      Last_name: userForm.value.last_name,
      Email: userForm.value.email,
      password: userForm.value.password,
    };
    this.http
      .post('http://3.218.140.109:3000/customers', userData)
      .subscribe((result: any) => {
        console.log(result.json);
      });
    console.log('Data:', userData);
  }
}
