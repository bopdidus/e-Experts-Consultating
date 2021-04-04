import { TestBed } from '@angular/core/testing';

import { IsExpertGuard } from './is-expert.guard';

describe('IsExpertGuard', () => {
  let guard: IsExpertGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsExpertGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
