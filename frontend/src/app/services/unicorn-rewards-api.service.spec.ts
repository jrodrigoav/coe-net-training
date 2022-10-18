import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ENV_CONFIG, IEnvironmentConfig } from '../interfaces/environment-config';
import { UnicornRewardsApiService } from './unicorn-rewards-api.service';


const MOCK_CONFIG: Partial<IEnvironmentConfig> = {
  unicornRewardsApiUrl: 'unicorn.com',
};

const TEST_ENDPOINT = (msg: string) => MOCK_CONFIG.unicornRewardsApiUrl + '/api/test/auth/' + msg;

describe('UnicornRewardsApiService', () => {
  let service: UnicornRewardsApiService;
  let httpTestCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: ENV_CONFIG, useValue: MOCK_CONFIG },
      ]
    });
    service = TestBed.inject(UnicornRewardsApiService);
    httpTestCtrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestCtrl.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET test', () => {
    const TEST_MSG = "TEST";

    service.test(TEST_MSG).subscribe(resp => {
      expect(resp).toBeTruthy();
    });

    const req = httpTestCtrl.expectOne(TEST_ENDPOINT(TEST_MSG));
    expect(req.request.method).toBe('GET');
    req.flush(TEST_MSG);
  });

});