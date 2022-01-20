import { TestBed } from '@angular/core/testing';

import { HasclinicGuard } from './hasclinic.guard';

describe('HasclinicGuard', () => {
  let guard: HasclinicGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasclinicGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
