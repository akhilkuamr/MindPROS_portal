import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.module';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  httpClient = inject(HttpClient);
  constructor(private http: HttpClient) {}

  fetchData() {
    return this.httpClient.get(`${AppConfig.apiBaseUrl}/customers`);
  }

  postData(data: any) {
    return this.httpClient.post(`${AppConfig.apiBaseUrl}/customers`, data);
  }
}
