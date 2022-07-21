import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ENV_CONFIG } from 'src/app/interfaces/environment-config';
import { TypicodeService } from 'src/app/services/typicode.service';
import { environment } from 'src/environments/environment';

import { AlbumsComponent } from './albums.component';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsComponent ],
      providers: [TypicodeService, { provide: ENV_CONFIG, useValue: environment}],
      imports: [HttpClientModule]
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
