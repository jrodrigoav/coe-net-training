import { inject, TestBed } from '@angular/core/testing';

import { TypicodeService } from './typicode.service';

export class MockLocalService {
  getAllUsers() { return [{id: 123, name: 'One', userName: 'test', email: 'Sincere@april.biz'}] 
  }
  getAllAlbums() { return [{id: 123, userId: 1, title: 'test'}]
  }
}

describe('TypicodeService', () => {
  let service: TypicodeService;
  let mockService = new MockLocalService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: TypicodeService, useValue: mockService}]
    }).compileComponents();
  });

  it('should be return users', inject([TypicodeService], (typicodeService : TypicodeService) => {
    return spyOn(mockService, "getAllUsers").and.returnValue([{id: 123, name: 'One', userName: 'test', email: 'Sincere@april.biz'}]);
  }));
  
  it('should be return albums', inject([TypicodeService], (typicodeService : TypicodeService) => {
    return spyOn(mockService, "getAllAlbums").and.returnValue([{id: 123, userId: 1, title: 'test'}]);
  }));
});
