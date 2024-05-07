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

  constructor(private http: HttpClient, private _router: Router) {
    this.getToken1();
  }

  loginUser(user: any) {
    return this.http.post(this._loginUrl, user);
  }

  getDataByUsername(username: string): Observable<any> {
    const url = `${this.baseUrl}?username=${username}`;
    return this.http.get(url);
  }

  loggedIn() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  }

  logoutUser() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      this._router.navigate(['/login']);
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  }

  getToken1() {
    if (typeof localStorage !== 'undefined') {
      // console.log(localStorage.getItem('user'));
      return localStorage.getItem('user');
    } else {
      return false;
    }
  }

  saveToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    } else {
      alert('localStorage is not defined.');
    }
  }

  clearToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    } else {
      console.error('localStorage is not defined.');
    }
  }
}
