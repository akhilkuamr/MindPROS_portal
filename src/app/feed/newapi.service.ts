import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewapiService {
  constructor(private _http: HttpClient) {}

  topHeadLineNews =
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=59ecefb046d943f7be882e543edcaf19';

  tcHeadlines(): Observable<any> {
    return this._http.get(this.topHeadLineNews);
  }
}
