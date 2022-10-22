import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { IUser } from 'src/app/interfaces/iuser';
import { ApiService } from 'src/app/services/api.service';
import { UsersComponent } from './users.component';

const MOCK_USERS: Partial<IUser>[] = [
  { id: 1, name: 'name1 ap1 ap2', email: 'name1@mail.com', username: 'name1_ap1', website: 'www.name1.com' },
  { id: 2, name: 'name2 ap1 ap2', email: 'name2@mail.com', username: 'name2_ap1', website: 'www.name2.com' },
  { id: 3, name: 'name3 ap1 ap2', email: 'name3@mail.com', username: 'name3_ap1', website: 'www.name3.com' },
];

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let el: DebugElement;
  let apiServiceSpy: any;

  beforeEach(async () => {

    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getAllUsers'])
    apiServiceSpy.getAllUsers.and.returnValue(of(MOCK_USERS));

    await TestBed.configureTestingModule({
      declarations: [
        UsersComponent,
        PaginatorComponent,
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
      ]
    }).overrideComponent(
      PaginatorComponent,
      {}
    ).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllUsers on init', () => {
    expect(apiServiceSpy.getAllUsers.calls.count()).toBe(1);
  });

  it('should display users table', () => {
    const rows = el.queryAll(By.css('tbody tr'));

    expect(rows.length).toBe(MOCK_USERS.length);

    rows.forEach((row, idx) => {
      const cells = row.queryAll(By.css('td'));

      expect(cells[0].nativeElement.textContent).toBe(MOCK_USERS[idx].id?.toString());
      expect(cells[1].nativeElement.textContent).toBe(MOCK_USERS[idx].name?.toString());
      expect(cells[2].nativeElement.textContent).toBe(MOCK_USERS[idx].username?.toString());

    });
  });

});
