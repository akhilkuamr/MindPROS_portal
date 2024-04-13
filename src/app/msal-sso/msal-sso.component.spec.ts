import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSALSSOComponent } from './msal-sso.component';

describe('MSALSSOComponent', () => {
  let component: MSALSSOComponent;
  let fixture: ComponentFixture<MSALSSOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MSALSSOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MSALSSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
