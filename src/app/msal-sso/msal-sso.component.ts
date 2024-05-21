import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-msal-sso',
  templateUrl: './msal-sso.component.html',
  styleUrls: ['./msal-sso.component.css'], // Use styleUrls instead of styleUrl
})
export class MSALSSOComponent implements OnInit {
  user: any;

  constructor(
    private msalService: MsalService,
    private _router: Router,
    private _auth: AuthServiceService
  ) {}
  ngOnInit() {}

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.instance.loginPopup().then((response) => {
      //console.log(response);
      const token = response.idToken;
      this._auth.saveToken(token);

      localStorage.setItem('token', response.idToken);
      this._router.navigate(['/dashboard']);
    });
  }
}
