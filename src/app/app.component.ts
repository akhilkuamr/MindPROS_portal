import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './service/auth-service.service';
import { AuthServicePaychexService } from './paychex/auth-service-paychex.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular_website';
  constructor(
    private _auth: AuthServiceService,
    private _authpaychex: AuthServicePaychexService
  ) {}

  ngOnInit(): void {
    if (!this._authpaychex.loggedIn()) {
      {
        // Authenticate the user using the stored token
        //this._auth.saveToken(storedToken);
      }
    }
  }
}
