import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private _eventsUrl = 'http://localhost:3000/event';
  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get(this._eventsUrl);
  }
}
