import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ENV_CONFIG } from '../interfaces/environment-config';
import { UnicornRewardsApiService } from './unicorn-rewards-api.service';

describe('UnicornRewardsApiService', () => {
  let service: UnicornRewardsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UnicornRewardsApiService, { provide: ENV_CONFIG, useValue: environment }],
    });
    service = TestBed.inject(UnicornRewardsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
