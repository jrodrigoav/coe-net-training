import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnicornRewardsApiService } from '../../../services/unicorn-rewards-api.service';
import { environment } from '../../../../environments/environment';
import { ENV_CONFIG } from '../../../interfaces/environment-config';
import { QuestionCreateComponent } from './question-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('QuestionCreateComponent', () => {
  let component: QuestionCreateComponent;
  let fixture: ComponentFixture<QuestionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCreateComponent ],
      imports: [HttpClientModule,ReactiveFormsModule],
      providers: [UnicornRewardsApiService, { provide: ENV_CONFIG, useValue: environment }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
