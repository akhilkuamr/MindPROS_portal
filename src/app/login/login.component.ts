import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  data: any = [];
  loginUserData: any = {};
  rememberMe: boolean = false;

  constructor(private _auth: AuthServiceService, private _router: Router) {}

  ngOnInit(): void {}

  loginUser() {
    try {
      this._auth.loginUser(this.loginUserData).subscribe((res: any) => {
        console.log(res);
        const token = res.token;
        this._auth.saveToken(token);
        if (this.rememberMe) {
          this._auth.saveToken(token);
        }

        localStorage.setItem('token', res.token);
        this._router.navigate(['/dashboard']);
      });
    } catch (error) {
      console.log(error);
      // Handle error (e.g., show an error message to the user)
    }
  }
}
