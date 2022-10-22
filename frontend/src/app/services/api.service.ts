import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAlbum } from '../interfaces/ialbum';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.apiURL;
  usersEndpoint = this.baseUrl + '/user';
  albumsEndpoint = this.baseUrl + '/albums';

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.usersEndpoint);
  }

  public getAllAlbums(): Observable<IAlbum[]> {
    return this.httpClient.get<IAlbum[]>(this.albumsEndpoint);
  }

}
