import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ENV_CONFIG } from '../../interfaces/environment-config';
import { UnicornRewardsApiService } from '../../services/unicorn-rewards-api.service';
import { TestUnicornApiComponent } from './test-unicorn-api.component';

describe('TestComponent', () => {
  let component: TestUnicornApiComponent;
  let fixture: ComponentFixture<TestUnicornApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UnicornRewardsApiService, { provide: ENV_CONFIG, useValue: environment }],
      declarations: [ TestUnicornApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestUnicornApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
