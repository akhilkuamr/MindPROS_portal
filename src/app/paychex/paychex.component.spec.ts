import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaychexComponent } from './paychex.component';

describe('PaychexComponent', () => {
  let component: PaychexComponent;
  let fixture: ComponentFixture<PaychexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaychexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaychexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
