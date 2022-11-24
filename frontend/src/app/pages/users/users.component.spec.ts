import { inject, TestBed } from '@angular/core/testing';
import { TypicodeService } from 'src/app/services/typicode.service';


export class MockLocalService {
  getAllUsers() { return [ {id: 123, name: 'One', userName: 'test', email: 'Sincere@april.biz'}] 
  }
}

describe('UsersComponent', () => {
  let mockService = new MockLocalService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: TypicodeService, useValue: mockService}]
    })
    .compileComponents();

  });

  it('should be return value', inject([TypicodeService], (typicodeService : TypicodeService) => {
    return spyOn(mockService, "getAllUsers").and.returnValue([ {id: 123, name: 'One', userName: 'test2', email: 'test@april.biz'}] );
  }));

});
