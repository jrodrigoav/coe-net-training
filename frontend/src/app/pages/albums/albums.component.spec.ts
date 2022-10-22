import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { IAlbum } from 'src/app/interfaces/ialbum';
import { ApiService } from 'src/app/services/api.service';
import { AlbumsComponent } from './albums.component';

const MOCK_ALBUMS: Partial<IAlbum>[] = [
  { id: 1, title: 'album 1', userId: 1 },
  { id: 2, title: 'album 1', userId: 1 },
  { id: 3, title: 'album 1', userId: 2 },
];

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let el: DebugElement;


  let apiServiceSpy: any;

  beforeEach(async () => {

    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getAllAlbums'])
    apiServiceSpy.getAllAlbums.and.returnValue(of(MOCK_ALBUMS));

    await TestBed.configureTestingModule({
      declarations: [
        AlbumsComponent,
        PaginatorComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).overrideComponent(
      PaginatorComponent,
      {}
    ).compileComponents();

    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listAllAlbums on init', () => {
    expect(apiServiceSpy.getAllAlbums.calls.count()).toBe(1);
  });


  it('should display albums table', () => {
    const rows = el.queryAll(By.css('tbody tr'));

    expect(rows.length).toBe(MOCK_ALBUMS.length);

    rows.forEach((row, idx) => {
      const cells = row.queryAll(By.css('td'));
      expect(cells[0].nativeElement.textContent).toBe(MOCK_ALBUMS[idx].id?.toString());
      expect(cells[1].nativeElement.textContent).toBe(MOCK_ALBUMS[idx].title?.toString());
    });
  });

});
