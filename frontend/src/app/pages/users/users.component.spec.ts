import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ENV_CONFIG } from '../../interfaces/environment-config';
import { TypicodeService } from '../../services/typicode.service';
import { UsersComponent } from './users.component';
import { of } from 'rxjs';
import { delay } from "rxjs/operators";
describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [HttpClientModule],
      providers: [TypicodeService, { provide: ENV_CONFIG, useValue: environment }]
    })
      .compileComponents();


  });

  it('should create', () => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.debugElement.componentInstance;
    spyOn(component, "getUsers").and.returnValue([]);
    component.ngOnInit();
    expect(component.users).toEqual([]);
  });

  it('should call getUsers and get response as array', fakeAsync(() => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TypicodeService);
    spyOn(service, "getAllUsers").and.callFake(() => {
      return of([{
        id: 1,
        name: 'Paco',
        username: 'paco3000',
        email: 'pacochido@unosquare.com',
        website: 'www.unosquare.com/paco',
        checked: true
      }]).pipe(delay(500));
    });
    component.getUsers();
    tick(1000);
    expect(component.users).toEqual([{
      id: 1,
      name: 'Paco',
      username: 'paco3000',
      email: 'pacochido@unosquare.com',
      website: 'www.unosquare.com/paco',
      checked: true
    }]);
  }))
});
