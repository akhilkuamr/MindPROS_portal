import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.module';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  data: any = [];
  loginUserData: any = {};
  rememberMe: boolean = false;
  user: any;
  errorMessage: string = '';
  // counter: any;
  constructor(
    private _auth: AuthServiceService,
    private _router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  loginUser() {
    // try {
    // this._auth.loginUser(this.loginUserData).subscribe((res: any) => {
    //   const token = res.token;
    //   this._auth.saveToken(token);
    //   if (this.rememberMe) {
    //     this._auth.saveToken(token);
    //   }
    //   localStorage.setItem('token', res.token);
    //   localStorage.setItem('user', this.loginUserData.Email);
    //------------- this.counter = localStorage.getItem('user');
    // this.http
    //   .get(`http://localhost:3000/fetchdata?param1=${this.counter}`)
    //   .subscribe((res: any) => {
    //     console.log((this.data = res));
    //   });
    //console.log(this.counter, 37);--------------
    //   this._router.navigate(['/dashboard']);
    // });
    // } catch (error: any) {
    // console.log(error);
    // }
    //console.log('43');

    this.http
      .post(`${AppConfig.apiBaseUrl}/login2`, this.loginUserData)
      .subscribe(
        (res: any) => {
          console.log(res, '52');
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('user', this.loginUserData.Email);
          this._router.navigate(['/dashboard']);
        },
        (error) => {
          if (error.status === 400) {
            alert('Invalid credentials'); // Show alert for invalid credentials
          } else if (error.status === 500) {
            alert('Internal server error'); // Show alert for internal server error
          } else {
            alert('An error occurred, please try again later.'); // Default error message
          }
        }
      );
  }
}
