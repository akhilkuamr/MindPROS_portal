import { Component } from '@angular/core';
import { AuthServicePaychexServices } from './auth-service-company-email';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company-email',
  templateUrl: './company-email.component.html',
  styleUrls: ['./company-email.component.css'],
})
export class CompanyEmailComponent {
  constructor(
    public _authpaychex: AuthServicePaychexServices,
    private router: Router
  ) {}

  loginUserData: any = {};
  rememberMe: boolean = false;

  ngOnInit(): void {
    // Initialization code here if needed
  }

  loginUser(): void {
    //console.log(this.loginUserData);
    try {
      this._authpaychex.loginUser(this.loginUserData).subscribe((res: any) => {
        console.log(res);
        const _authpaychex = res.token;
        this._authpaychex.setToken(_authpaychex);

        if (this.rememberMe && typeof localStorage !== 'undefined') {
          localStorage.setItem('token', _authpaychex);
        } else if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('token');
        }

        this.router.navigate(['/companyemail/companydashboard']);
      });
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message to the user)
    }
  }
}
