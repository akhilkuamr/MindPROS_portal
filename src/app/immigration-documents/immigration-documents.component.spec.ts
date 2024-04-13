import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationDocumentsComponent } from './immigration-documents.component';

describe('ImmigrationDocumentsComponent', () => {
  let component: ImmigrationDocumentsComponent;
  let fixture: ComponentFixture<ImmigrationDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImmigrationDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImmigrationDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
