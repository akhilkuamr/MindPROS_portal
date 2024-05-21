import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.module';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = `${AppConfig.apiBaseUrl}/details`; // Replace with your backend API URL
  private apiUrl1 = `${AppConfig.apiBaseUrl}/fetchda`;
  userId: String;
  constructor(private http: HttpClient) {
    this.userId = '';
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  get(): Observable<any> {
    this.userId = 'akhilkumar@mindpros.com';
    return this.http.get<any>(`${this.apiUrl1}/${this.userId}`);
  }
}
