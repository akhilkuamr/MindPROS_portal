import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SkillMatrixComponent } from './skill-matrix/skill-matrix.component';
import { CompanyEmailDashboardComponent } from './company-email-dashboard/company-email-dashboard.component';
import { ImmigrationDocumentsComponent } from './immigration-documents/immigration-documents.component';
import { SkillComponent } from './skill/skill.component';
import { EmployeesComponent } from './employees/employees.component';
import { PaychexComponent } from './paychex/paychex.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PermissionsService } from './service/auth.guard';

const routes: Routes = [
  // { path: 'signup', component: SignupComponent },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: 'signup/login', component: LoginComponent },
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
