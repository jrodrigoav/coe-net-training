import { inject, TestBed } from '@angular/core/testing';
import { TypicodeService } from 'src/app/services/typicode.service';

export class MockLocalService {
  getAllAlbums() { return [{id: 123, userId: 1, title: 'test'}] 
  }
}

describe('AlbumsComponent', () => {
  let mockService = new MockLocalService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: TypicodeService, useValue: mockService}]
    })
    .compileComponents();
  });

  it('should be return value', inject([TypicodeService], (typicodeService : TypicodeService) => {
    return spyOn(mockService, "getAllAlbums").and.returnValue([{id: 123, userId: 1, title: 'test'}]);
  }));
});
