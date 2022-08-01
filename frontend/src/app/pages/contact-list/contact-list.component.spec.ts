import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { ENV_CONFIG } from '../../interfaces/environment-config';
import { IUser } from '../../interfaces/iuser';
import { TypicodeService } from '../../services/typicode.service';
import { UnicornRewardsApiService } from '../../services/unicorn-rewards-api.service';

import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

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
    localStorage.removeItem("UserListSelected");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the selected users for a json file', () => {
    let users: IUser[] = [];
    users = component.loadSelectedUsers("usuarios");
    expect(users.length).toBeGreaterThan(1);
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
});
