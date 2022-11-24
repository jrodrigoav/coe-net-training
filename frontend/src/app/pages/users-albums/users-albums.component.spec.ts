import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';


export class MockLocalService {
  getAllUsersAlbums() { return [{id: 123, name: 'One', title: 'test'}] 
  }
}

describe('UsersAlbumsComponent', () => {
  let mockService = new MockLocalService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: UnicornRewardsApiService, useValue: mockService}]
    })
    .compileComponents();

  });

  it('should be return value', inject([UnicornRewardsApiService], (unicornRewardsApiService : UnicornRewardsApiService) => {
    return spyOn(mockService, "getAllUsersAlbums").and.returnValue([{id: 123, name: 'One', title: 'test'}]);
  }));
});
