import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://3.218.140.109:3000/details'; // Replace with your backend API URL
  private apiUrl1 = 'http://3.218.140.109:3000/fetchdata';
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
