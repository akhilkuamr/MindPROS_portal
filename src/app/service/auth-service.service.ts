import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private _loginUrl = 'http://localhost:3000/login';
  private tokenKey = 'token';
  private baseUrl = 'http://localhost:3000/fetch';
  constructor(private http: HttpClient, private _router: Router) {}

  loginUser(user: any) {
    return this.http.post(this._loginUrl, user);
  }

  getDataByUsername(username: string): Observable<any> {
    // Include username as a query parameter in the URL
    return this.http.get(`${this.baseUrl}?username=${username}`);
  }

  loggedIn() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      // Handle the case where localStorage is not defined
      return false;
    }
  }

  logoutUser() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      this._router.navigate(['/']);
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      // Handle the case where localStorage is not defined
      return false;
    }
  }

  saveToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    } else {
      // Handle the case where localStorage is not defined
      alert('localStorage is not defined.');
    }
  }

  clearToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    } else {
      // Handle the case where localStorage is not defined
      console.error('localStorage is not defined.');
    }
  }
}
