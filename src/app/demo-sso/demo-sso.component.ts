import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-demo-sso',
  templateUrl: './demo-sso.component.html',
  styleUrl: './demo-sso.component.css',
})
export class DemoSsoComponent {
  user: any;
  loggedIn: any;
  //static user: any;

  constructor(
    private authService: SocialAuthService,
    private _router: Router,
    private _auth: AuthServiceService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
      const token = user.idToken;
      this._auth.saveToken(token);

      localStorage.setItem('token', user.idToken);
      this._router.navigate(['/dashboard']);
      if (this.user) {
        this.http
          .post('http://localhost:3000/google', this.user)
          .subscribe((result: any) => {
            console.log(result.json);
          });
      }
    });
  }
}
