import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  httpClient = inject(HttpClient);
  constructor(private http: HttpClient) {}

  fetchData() {
    return this.httpClient.get('http://localhost:3000/customers');
  }

  postData(data: any) {
    return this.httpClient.post('http://localhost:3000/customers', data);
  }
}
