import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ENV_CONFIG, IEnvironmentConfig } from '../interfaces/environment-config';
import { UsersAlbums } from '../interfaces/iusers-albums';

@Injectable({
  providedIn: 'root'
})
export class UnicornRewardsApiService {
  private baseUrl: string;
  constructor(@Inject(ENV_CONFIG) private config: IEnvironmentConfig, private http: HttpClient) {
    this.baseUrl = config.unicornRewardsApiUrl.replace(/\/+$/, '');
  }

  private resourceUrl(resource: string) {
    return `${this.baseUrl}/${resource}`;
  }

  test(message: string): Observable<any> {
    const msg= encodeURIComponent(message ?? "Hello World");
    return this.http.get(this.resourceUrl(`api/test/auth/${msg}`));
  }

  getUsersAlbums(message: string): Observable<UsersAlbums> {
    const msg= encodeURIComponent(message ?? "Hello World");
    return this.http.get<UsersAlbums>(this.resourceUrl(`api/userAlbum/getAllAlbums/${msg}`));
  }


  getPdf(): any {
    return this.http.get(this.resourceUrl(`api/userAlbum/getPdf`), { observe: 'response', responseType: 'blob' as 'json' })
            .pipe(map((res) => {
              return new Blob([res.body as BlobPart], { type: 'application/pdf'})
            }))
  }
  
}
