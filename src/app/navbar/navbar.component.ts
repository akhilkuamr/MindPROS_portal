import { Component, Inject } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { CommonModule, DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  counter: string;
  currentDate: Date;
  currentTime: string;

  constructor(
    public _authService: AuthServiceService,
    @Inject(DOCUMENT) private document: Document
  ) {
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      this.counter = localStorage.getItem('user');
    }
    this.currentDate = new Date();
  }
}
