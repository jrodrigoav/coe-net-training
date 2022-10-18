import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IUser } from 'src/app/interfaces/iuser';
import { TypicodeService } from 'src/app/services/typicode.service';
import { UsersComponent } from './users.component';

const MOCK_USERS: Partial<IUser>[] = [
  { id: 1, name: 'name1 ap1 ap2', email: 'name1@mail.com', username: 'name1_ap1', website: 'www.name1.com' },
  { id: 2, name: 'name2 ap1 ap2', email: 'name2@mail.com', username: 'name2_ap1', website: 'www.name2.com' },
  { id: 3, name: 'name3 ap1 ap2', email: 'name3@mail.com', username: 'name3_ap1', website: 'www.name3.com' },
];

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let typicodeServiceSpy: any;

  beforeEach(async () => {

    typicodeServiceSpy = jasmine.createSpyObj<TypicodeService>('TypicodeService', ['getAllUsers'])
    typicodeServiceSpy.getAllUsers.and.returnValue(of(MOCK_USERS));

    await TestBed.configureTestingModule({
      declarations: [
        UsersComponent
      ],
      providers: [
        { provide: TypicodeService, useValue: typicodeServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllUsers on init', () => {
    expect(typicodeServiceSpy.getAllUsers.calls.count()).toBe(1);
  });

});
