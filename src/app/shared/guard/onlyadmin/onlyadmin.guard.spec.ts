import { TestBed } from '@angular/core/testing';

import { OnlyadminGuard } from './onlyadmin.guard';

describe('OnlyadminGuard', () => {
  let guard: OnlyadminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyadminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
