import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkypePageComponent } from './skype-page.component';

describe('SkypePageComponent', () => {
  let component: SkypePageComponent;
  let fixture: ComponentFixture<SkypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkypePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
