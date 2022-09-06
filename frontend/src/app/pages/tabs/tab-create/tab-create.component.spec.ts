import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnicornRewardsApiService } from '../../../services/unicorn-rewards-api.service';
import { environment } from '../../../../environments/environment';
import { ENV_CONFIG } from '../../../interfaces/environment-config';
import { TabCreateComponent } from './tab-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TabCreateComponent', () => {
  let component: TabCreateComponent;
  let fixture: ComponentFixture<TabCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabCreateComponent ],
      imports: [HttpClientModule,FormsModule,ReactiveFormsModule ],
      providers: [UnicornRewardsApiService, { provide: ENV_CONFIG, useValue: environment }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
