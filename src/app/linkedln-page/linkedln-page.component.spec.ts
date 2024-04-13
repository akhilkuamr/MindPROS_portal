import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedlnPageComponent } from './linkedln-page.component';

describe('LinkedlnPageComponent', () => {
  let component: LinkedlnPageComponent;
  let fixture: ComponentFixture<LinkedlnPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkedlnPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkedlnPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
