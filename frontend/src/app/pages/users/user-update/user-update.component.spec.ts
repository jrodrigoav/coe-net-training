import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserUpdateComponent } from './user-update.component';
import { UnicornRewardsApiService } from '../../../services/unicorn-rewards-api.service';
import { environment } from '../../../../environments/environment';
import { ENV_CONFIG } from '../../../interfaces/environment-config';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdateComponent ],
      imports: [ HttpClientModule,ReactiveFormsModule,RouterTestingModule ],
      providers: [UnicornRewardsApiService, { provide: ENV_CONFIG, useValue: environment }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
