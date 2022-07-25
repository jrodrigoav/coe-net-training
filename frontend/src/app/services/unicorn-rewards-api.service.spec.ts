import { TestBed } from '@angular/core/testing';

import { UnicornRewardsApiService } from './unicorn-rewards-api.service';

describe('UnicornRewardsApiService', () => {
  let service: UnicornRewardsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnicornRewardsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
