import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnicornRewardsApiService } from '../../../services/unicorn-rewards-api.service';
import { environment } from '../../../../environments/environment';
import { ENV_CONFIG } from '../../../interfaces/environment-config';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsHomeComponent } from './tabs-home.component';

describe('TabsHomeComponent', () => {
  let component: TabsHomeComponent;
  let fixture: ComponentFixture<TabsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsHomeComponent ],
      imports: [HttpClientModule,FormsModule,ReactiveFormsModule ],
      providers: [UnicornRewardsApiService, { provide: ENV_CONFIG, useValue: environment }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
