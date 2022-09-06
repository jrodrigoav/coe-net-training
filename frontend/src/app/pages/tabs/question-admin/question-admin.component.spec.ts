import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnicornRewardsApiService } from '../../../services/unicorn-rewards-api.service';
import { environment } from '../../../../environments/environment';
import { ENV_CONFIG } from '../../../interfaces/environment-config';
import { QuestionAdminComponent } from './question-admin.component';
import { HttpClientModule } from '@angular/common/http';

describe('QuestionAdminComponent', () => {
  let component: QuestionAdminComponent;
  let fixture: ComponentFixture<QuestionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAdminComponent ],
      imports: [HttpClientModule],
      providers: [UnicornRewardsApiService, { provide: ENV_CONFIG, useValue: environment }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
