import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IEnvironmentConfig, ENV_CONFIG } from '../interfaces/environment-config';
import { IUser } from '../interfaces/iuser';
import { IAlbum } from '../interfaces/ialbum';

@Injectable({
  providedIn: 'root'
})
export class TypicodeService {
  private baseUrl: string;
  constructor(@Inject(ENV_CONFIG) private config: IEnvironmentConfig, private http: HttpClient) {
    this.baseUrl = config.typicodeUrl.replace(/\/+$/, '');
  }

  private resourceUrl(resource: string) {
    return `${this.baseUrl}/${resource}`;
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.resourceUrl('users'));
  }

  getAllAlbums(): Observable<IAlbum[]> {
    return this.http.get<IAlbum[]>(this.resourceUrl('albums'));
  }
}
