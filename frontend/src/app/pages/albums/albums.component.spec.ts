import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ENV_CONFIG } from '../../interfaces/environment-config';
import { TypicodeService } from '../../services/typicode.service';
import { AlbumsComponent } from './albums.component';
import { MsalGuard } from '@azure/msal-angular';
import { RouterModule, Routes } from '@angular/router';
import { UploadAlbumsComponent } from './upload-albums/upload-albums.component';
const routes: Routes = [
  { path: 'albums/upload', component: UploadAlbumsComponent, canActivate: [MsalGuard] },
];
describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsComponent ],
      imports: [HttpClientModule,
        RouterModule.forRoot(routes )],
      providers: [TypicodeService, { provide: ENV_CONFIG, useValue: environment }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
