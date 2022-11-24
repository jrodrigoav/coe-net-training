import { inject, TestBed } from '@angular/core/testing';

import { UnicornRewardsApiService } from './unicorn-rewards-api.service';

export class MockLocalService {
  getAllUsersAlbums() { return [{id: 123, name: 'One', title: 'test'}] 
  }
  getAllAlbums() { return [{id: 123, userId: 1, title: 'test'}]
  }
}

describe('UnicornRewardsApiService', () => {
  let service: UnicornRewardsApiService;
  let mockService = new MockLocalService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: UnicornRewardsApiService, useValue: mockService}]
    }).compileComponents();
    service = TestBed.inject(UnicornRewardsApiService);
  });

  it('should be return users-albums', inject([UnicornRewardsApiService], (unicornRewardsApiService : UnicornRewardsApiService) => {
    return spyOn(mockService, "getAllUsersAlbums").and.returnValue([{id: 123, name: 'One', title: 'test'}]);
  }));
  
});
