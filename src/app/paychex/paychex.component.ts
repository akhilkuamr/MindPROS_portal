import { Component, OnInit } from '@angular/core';
import { AuthServicePaychexService } from './auth-service-paychex.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paychex',
  templateUrl: './paychex.component.html',
  styleUrls: ['./paychex.component.css'],
})
export class PaychexComponent implements OnInit {
  constructor(
    public _authpaychex: AuthServicePaychexService,
    private router: Router
  ) {}

  loginUserData: any = {};
  rememberMe: boolean = false;

  ngOnInit(): void {
    // Initialization code here if needed
  }

  loginUser(): void {
    try {
      this._authpaychex.loginUser(this.loginUserData).subscribe((res: any) => {
        console.log(res);
        const _authpaychex = res.token;
        this._authpaychex.setToken(_authpaychex);

        if (this.rememberMe && typeof localStorage !== 'undefined') {
          localStorage.setItem('token1', _authpaychex);
        } else if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('token1');
        }

        //this.router.navigate(['dashboard/paychex/paychexdashboard']);
      });
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message to the user)
    }
  }
}
