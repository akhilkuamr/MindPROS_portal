import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaychexPageComponent } from './paychex-page.component';

describe('PaychexPageComponent', () => {
  let component: PaychexPageComponent;
  let fixture: ComponentFixture<PaychexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaychexPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaychexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
