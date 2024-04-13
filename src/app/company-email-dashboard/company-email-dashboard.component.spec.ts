import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmailDashboardComponent } from './company-email-dashboard.component';

describe('CompanyEmailDashboardComponent', () => {
  let component: CompanyEmailDashboardComponent;
  let fixture: ComponentFixture<CompanyEmailDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyEmailDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyEmailDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
