import { TestBed } from '@angular/core/testing';

import { TypicodeService } from './typicode.service';

describe('TypicodeService', () => {
  let service: TypicodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypicodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
