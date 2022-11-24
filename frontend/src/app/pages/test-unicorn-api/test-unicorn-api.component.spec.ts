import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { TypicodeService } from 'src/app/services/typicode.service';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

import { TestUnicornApiComponent } from './test-unicorn-api.component';

export class MockLocalService {
  auth() { return [{ returned: 'returned'}] 
  }
}

describe('TestComponent', () => {
  let mockService = new MockLocalService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: UnicornRewardsApiService, useValue: mockService}]
    })
    .compileComponents();
  });

  it('should be return auth text', inject([UnicornRewardsApiService], (unicornRewardsApiService : UnicornRewardsApiService) => {
    return spyOn(mockService, "auth").and.returnValue([{returned: 'test'}]);
  }));
});
