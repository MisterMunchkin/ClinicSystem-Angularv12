import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHistoryFormDialogComponent } from './patient-history-form-dialog.component';

describe('PatientHistoryFormDialogComponent', () => {
  let component: PatientHistoryFormDialogComponent;
  let fixture: ComponentFixture<PatientHistoryFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientHistoryFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHistoryFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
