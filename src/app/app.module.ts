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
import { FeedComponent, LimitWordsPipe } from './feed/feed.component';
import { NewapiService } from './feed/newapi.service';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SkillMatrixComponent } from './skill-matrix/skill-matrix.component';
import { ImmigrationDocumentsComponent } from './immigration-documents/immigration-documents.component';
import { SkillComponent } from './skill/skill.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { EmployeesComponent } from './employees/employees.component';
import { PaychexComponent } from './paychex/paychex.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

export const AppConfig = {
  apiBaseUrl: 'https://api.e-arena.mind-pros.com',
  // Add more URLs or other configuration constants here
};

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
    LimitWordsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    TreeViewModule,
    MatTableModule,
    MatButton,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    MatListModule,
    MatGridListModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
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
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
