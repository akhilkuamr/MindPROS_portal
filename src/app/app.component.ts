import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './service/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular_website';
  constructor(private _auth: AuthServiceService) {}

  ngOnInit(): void {}
}
