import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicOnboardingComponent } from './clinic-onboarding.component';

describe('ClinicOnboardingComponent', () => {
  let component: ClinicOnboardingComponent;
  let fixture: ComponentFixture<ClinicOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
