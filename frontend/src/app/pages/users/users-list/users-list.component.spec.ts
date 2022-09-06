import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnicornRewardsApiService } from '../../../services/unicorn-rewards-api.service';
import { environment } from '../../../../environments/environment';
import { ENV_CONFIG } from '../../../interfaces/environment-config';
import { HttpClientModule } from '@angular/common/http';
import { UsersListComponent } from './users-list.component';
import { FormsModule } from '@angular/forms';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListComponent ],
      imports: [ HttpClientModule,FormsModule  ],
      providers: [UnicornRewardsApiService, { provide: ENV_CONFIG, useValue: environment }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
