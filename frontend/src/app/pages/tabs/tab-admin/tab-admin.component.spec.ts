import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnicornRewardsApiService } from '../../../services/unicorn-rewards-api.service';
import { environment } from '../../../../environments/environment';
import { ENV_CONFIG } from '../../../interfaces/environment-config';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TabAdminComponent } from './tab-admin.component';

describe('TabAdminComponent', () => {
  let component: TabAdminComponent;
  let fixture: ComponentFixture<TabAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabAdminComponent ],
      imports: [HttpClientModule ],
      providers: [UnicornRewardsApiService, { provide: ENV_CONFIG, useValue: environment }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
