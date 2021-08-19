import { TestBed } from '@angular/core/testing';

import { OnlydoctorGuard } from './onlydoctor.guard';

describe('OnlydoctorGuard', () => {
  let guard: OnlydoctorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlydoctorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
