import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSsoComponent } from './demo-sso.component';

describe('DemoSsoComponent', () => {
  let component: DemoSsoComponent;
  let fixture: ComponentFixture<DemoSsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoSsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoSsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
