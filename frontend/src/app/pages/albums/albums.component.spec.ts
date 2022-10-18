import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IAlbum } from 'src/app/interfaces/ialbum';
import { TypicodeService } from 'src/app/services/typicode.service';
import { AlbumsComponent } from './albums.component';

const MOCK_ALBUMS: Partial<IAlbum>[] = [
  { id: 1, title: 'album 1', userId: 1 },
  { id: 2, title: 'album 1', userId: 1 },
  { id: 3, title: 'album 1', userId: 2 },
];

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let typicodeServiceSpy: any;

  beforeEach(async () => {

    typicodeServiceSpy = jasmine.createSpyObj('TypicodeService', ['getAllAlbums'])
    typicodeServiceSpy.getAllAlbums.and.returnValue(of(MOCK_ALBUMS));

    await TestBed.configureTestingModule({
      declarations: [
        AlbumsComponent
      ],
      providers: [
        { provide: TypicodeService, useValue: typicodeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllAlbums on init', () => {
    expect(typicodeServiceSpy.getAllAlbums.calls.count()).toBe(1);
  });

});
