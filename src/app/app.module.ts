import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainPageComponent } from './main-page/main-page.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from './service/auth-service.service';
import { PermissionsService } from './service/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyEmailComponent } from './company-email/company-email.component';
import { CompanyEmailDashboardComponent } from './company-email-dashboard/company-email-dashboard.component';
import { AuthServicePaychexServices } from './company-email/auth-service-company-email';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { MSALSSOComponent } from './msal-sso/msal-sso.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import { FeedComponent } from './feed/feed.component';
import { NewapiService } from './feed/newapi.service';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SkillMatrixComponent } from './skill-matrix/skill-matrix.component';
import { ImmigrationDocumentsComponent } from './immigration-documents/immigration-documents.component';
import { SkillComponent } from './skill/skill.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { EmployeesComponent } from './employees/employees.component';
import { PaychexComponent } from './paychex/paychex.component';

//import * as bootstrap from 'bootstrap';
const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  //{ path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup/login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'information', component: PersonalInfoComponent },
  { path: 'skillmatrix', component: SkillMatrixComponent },
  { path: 'companyemail', component: CompanyEmailDashboardComponent },
  { path: 'immigration', component: ImmigrationDocumentsComponent },
  { path: 'skill', component: SkillComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'paychex', component: PaychexComponent },

  { path: 'immigration', component: ImmigrationDocumentsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [PermissionsService],
  },
];

function MsalInstanceFactory(): IPublicClientApplication {
  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: '7cf093ac-4845-4158-b9ee-3c3bc5f9dff9',
      authority:
        'https://login.microsoftonline.com/36b2f884-33d8-4af6-826f-434a33d002f9',
      redirectUri: 'http://localhost:4200/dashboard',
    },
  });
  msalInstance.initialize();
  return msalInstance;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    MainPageComponent,
    DashboardComponent,
    CompanyEmailComponent,
    CompanyEmailDashboardComponent,
    MSALSSOComponent,
    FeedComponent,
    PersonalInfoComponent,
    SkillMatrixComponent,
    ImmigrationDocumentsComponent,
    SkillComponent,
    EmployeesComponent,
    PaychexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    TreeViewModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // exports: [RouterModule],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AuthServiceService,
    NewapiService,
    PermissionsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '992675537054-njnn04ctevktacsflc40hd57delskgbl.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MsalInstanceFactory,
    },
    MsalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
