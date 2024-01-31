import { Component, OnInit } from '@angular/core';
import { PaychexComponent } from '../paychex/paychex.component';
import { AuthServiceService } from '../service/auth-service.service';
@Component({
  selector: 'app-paychex-page',
  templateUrl: './paychex-page.component.html',
  styleUrl: './paychex-page.component.css',
})
export class PaychexPageComponent implements OnInit {
  name: any = {};
  constructor(
    private _auth: AuthServiceService,
    private paychex: PaychexComponent
  ) {}
  ngOnInit(): void {
    this._auth
      .getDataByUsername(this.paychex.loginUserData.Email)
      .subscribe((res) => (this.name = res));
    console.log(this.name);
  }
}
