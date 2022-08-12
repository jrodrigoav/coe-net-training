import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ENV_CONFIG } from '../../interfaces/environment-config';
import { IUser } from '../../interfaces/iuser';
import { TypicodeService } from '../../services/typicode.service';
import { UnicornRewardsApiService } from '../../services/unicorn-rewards-api.service';

import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let subscriptions: Subscription[] = [];

  beforeAll(() => {
    localStorage.removeItem("UserListSelected");
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      imports: [HttpClientModule],
      providers: [TypicodeService, { provide: ENV_CONFIG, useValue: environment }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(async () => {
    subscriptions.forEach(sub => sub.unsubscribe());
    localStorage.removeItem("UserListSelected");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the selected users from localstorage', (done: DoneFn) => {

    subscriptions.push(component.loadUsersFromService().subscribe(
      r => component.listUsers = r,
      error => { console.log(error) },
      () => {
      
        let users: IUser[] = [];
        users = component.loadSelectedUsers("UserListSelected");
        expect(users.length).toBeGreaterThan(1);

        done();
      }
    ));
  });

  it('should save localstorage with the list of selected users', () => {
    let usuarios: IUser[] = [
      { id: 999, name: "testuser 0", username: "test 0", email: "Sincere@april.biz", website: "test.com", checked:true },
      { id: 998, name: "testuser 1", username: "test 0", email: "Sincere@april.biz", website: "test.com", checked: true },
      { id: 997, name: "testuser 2", username: "test 0", email: "Sincere@april.biz", website: "test.com", checked: true },
      { id: 996, name: "testuser 3", username: "test 0", email: "Sincere@april.biz", website: "test.com", checked: true },
    ];
    component.saveSelectedUsers(usuarios);
    let content = localStorage.getItem('UserListSelected');
    expect(localStorage.getItem('UserListSelected')).not.toBeNull();
    expect(content).toContain("testuser 2");
    
  });

  it('should return true if the item is on the list user', (done: DoneFn) => {
    subscriptions.push(component.loadUsersFromService().subscribe(
      r => component.listUsers = r,
      error => { console.log(error) },
      () => {
        if (localStorage.getItem("UserListSelected") === null) component.saveSelectedUsers(component.listUsers.slice(0, 2));
        component.load_localstorage();
        expect(component.existOnListUsers("Ervin Howell")).toBeTrue();
        done();
      }
    ));
  });

  it('should return false if the item is not the list user', (done: DoneFn) => {
    subscriptions.push(component.loadUsersFromService().subscribe(
      r => component.listUsers = r,
      error => { console.log(error) },
      () => {
        if (localStorage.getItem("UserListSelected") === null) component.saveSelectedUsers(component.listUsers.slice(0, 2));
        component.load_localstorage();
        
        expect(component.existOnListUsers("testuser")).toBeFalse();
        done();
      }
    ));
  });

  it('should return true if the item is in the selected list', (done: DoneFn) => {
    subscriptions.push(component.loadUsersFromService().subscribe(
      r => component.listUsers = r,
      error => { console.log(error) },
      () => {
        if (localStorage.getItem("UserListSelected") === null) component.saveSelectedUsers(component.listUsers.slice(0, 2));

        new Observable<any>((observer) => {
          observer.next(component.load_localstorage),
           observer.complete();
        }).subscribe(
          next => { },
          error => { },
          () => {
            expect(component.existOnSelectedUsers("Leanne Graham")).toBeTrue();
            done();
          }
        );
      }
    ));
  });

  it('should return false if the item is not the selected list', (done: DoneFn) => {
    subscriptions.push(component.loadUsersFromService().subscribe(
      r => component.listUsers = r,
      error => { console.log(error) },
      () => {
        if (localStorage.getItem("UserListSelected") === null) component.saveSelectedUsers(component.listUsers.slice(0, 2));

        new Observable<any>((observer) => {
          observer.next(component.load_localstorage),
            observer.complete();
        }).subscribe(
          next => { },
          error => { },
          () => {
            expect(component.existOnSelectedUsers("users1")).toBeFalse();
            done();
          }
        );
      }
    ));
  });

});
