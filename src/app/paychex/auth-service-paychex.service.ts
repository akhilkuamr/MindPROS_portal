import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServicePaychexService {
  private _loginUrl = 'http://localhost:3000/login';
  private readonly TOKEN_KEY = 'authToken';
  private readonly EXPIRATION_KEY = 'tokenExpiration';

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user: any) {
    return this.http
      .post<any>(this._loginUrl, user)
      .pipe(tap((response) => this.setToken(response.token1)));
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);

    // Set expiration time for the token (e.g., 30 days)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    localStorage.setItem(this.EXPIRATION_KEY, expirationDate.toISOString());
  }

  loggedIn() {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem(this.TOKEN_KEY); // Simplified check for token existence
    } else {
      // Handle the case where localStorage is not defined
      return false;
    }
  }

  logoutUser() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.EXPIRATION_KEY);
      this.router.navigate(['/']);
      return true;
    } else {
      // Handle the case where localStorage is not defined
      return false;
    }
  }

  getToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    } else {
      // Handle the case where localStorage is not defined
      return false;
    }
  }

  // The saveToken and clearToken methods are redundant as they duplicate functionality already present in setToken and logoutUser methods.
}
