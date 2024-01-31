import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent implements OnInit {
  events: any;
  constructor(private _eventService: EventService, private _router: Router) {}

  ngOnInit(): void {
    try {
      this._eventService.getEvents().subscribe((res) => {
        this.events = res;
      });
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this._router.navigate(['/login']);
        }
      }
    }
  }
}
