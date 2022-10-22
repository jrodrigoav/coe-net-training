import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { IAlbum } from '../interfaces/ialbum';
import { IUser } from '../interfaces/iuser';

import { ApiService } from './api.service';

const USERS_ENDPOINT = environment.apiURL + '/user';
const ALBUMS_ENDPOINT = environment.apiURL + '/albums';

const MOCK_USERS: Partial<IUser>[] = [
  { id: 1, name: 'name1 ap1 ap2', email: 'name1@mail.com', username: 'name1_ap1', website: 'www.name1.com' },
  { id: 2, name: 'name2 ap1 ap2', email: 'name2@mail.com', username: 'name2_ap1', website: 'www.name2.com' },
  { id: 3, name: 'name3 ap1 ap2', email: 'name3@mail.com', username: 'name3_ap1', website: 'www.name3.com' },
];

const MOCK_ALBUMS: Partial<IAlbum>[] = [
  { id: 1, title: 'album 1', userId: 1 },
  { id: 2, title: 'album 1', userId: 1 },
  { id: 3, title: 'album 1', userId: 2 },
];


describe('ApiService', () => {
  let service: ApiService;
  let httpTestCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(ApiService);
    httpTestCtrl = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list all Users', () => {
    service.getAllUsers().subscribe(resp => {
      expect(resp).toBeTruthy();
      expect(resp.length).toBe(MOCK_USERS.length);
    });

    const req = httpTestCtrl.expectOne(USERS_ENDPOINT);
    expect(req.request.method).toBe('GET');

    req.flush(MOCK_USERS);
  });

  it('should GET all albums', () => {
    service.getAllAlbums().subscribe(resp => {
      expect(resp).toBeTruthy();
      expect(resp.length).toBe(MOCK_ALBUMS.length);
    });

    const req = httpTestCtrl.expectOne(ALBUMS_ENDPOINT);
    expect(req.request.method).toBe('GET');

    req.flush(MOCK_ALBUMS);
  });

});
