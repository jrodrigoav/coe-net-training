import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ENV_CONFIG } from '../../../interfaces/environment-config';
import { TypicodeService } from '../../../services/typicode.service';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumsComponent } from '../albums.component';
import { MsalGuard } from '@azure/msal-angular';
import { UploadAlbumsComponent } from './upload-albums.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
const routes: Routes = [
  { path: 'albums', component: AlbumsComponent, canActivate: [MsalGuard] },
];
describe('UploadAlbumsComponent', () => {
  let component: UploadAlbumsComponent;
  let fixture: ComponentFixture<UploadAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAlbumsComponent ],
      imports: [HttpClientModule,ReactiveFormsModule,RxReactiveFormsModule,
        RouterModule.forRoot(routes ) ],
      providers: [TypicodeService, { provide: ENV_CONFIG, useValue: environment }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
