import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ENV_CONFIG } from '../../../interfaces/environment-config';
import { TypicodeService } from '../../../services/typicode.service';
import { UsersEditComponent } from './users-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from '../users.component';
import { MsalGuard } from '@azure/msal-angular';
const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [MsalGuard] },
];
describe('UsersEditComponent', () => {
  let component: UsersEditComponent;
  let fixture: ComponentFixture<UsersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersEditComponent ],
      imports: [HttpClientModule,ReactiveFormsModule,
        RouterModule.forRoot(routes ) ],
      providers: [TypicodeService, { provide: ENV_CONFIG, useValue: environment }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
