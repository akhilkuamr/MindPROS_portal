import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { MainPageComponent } from './main-page/main-page.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from './service/auth-service.service';
import { EventComponent } from './event/event.component';
import { EventService } from './event/event.service';
import { PermissionsService } from './service/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaychexComponent } from './paychex/paychex.component';
import { AuthServicePaychexService } from './paychex/auth-service-paychex.service';
import { PaychexPageComponent } from './paychex-page/paychex-page.component';
const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup/login', component: LoginComponent },
  {
    path: 'event',
    component: EventComponent,
    canActivate: [PermissionsService],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [PermissionsService],
    children: [
      {
        path: 'paychex',
        component: PaychexComponent,
        children: [
          { path: 'paychexdashboard', component: PaychexPageComponent },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    SignupComponent,
    MainPageComponent,
    EventComponent,
    DashboardComponent,
    PaychexComponent,
    PaychexPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],

  // exports: [RouterModule],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AuthServiceService,
    EventService,
    PermissionsService,
    AuthServicePaychexService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
