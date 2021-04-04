import { TestBed } from '@angular/core/testing';

import { IsNotExpertGuard } from './is-not-expert.guard';

describe('IsNotExpertGuard', () => {
  let guard: IsNotExpertGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNotExpertGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
