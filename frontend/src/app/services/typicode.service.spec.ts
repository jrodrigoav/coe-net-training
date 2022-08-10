import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ENV_CONFIG } from '../interfaces/environment-config';

import { TypicodeService } from './typicode.service';

describe('TypicodeService', () => {
  let service: TypicodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TypicodeService, { provide: ENV_CONFIG, useValue: environment }],
    });
    service = TestBed.inject(TypicodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
