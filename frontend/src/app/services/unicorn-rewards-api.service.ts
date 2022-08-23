import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ENV_CONFIG, IEnvironmentConfig } from '../interfaces/environment-config';

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
    const msg = encodeURIComponent(message ?? "Hello World");
    return this.http.get(this.resourceUrl(`api/test/auth/${msg}`));
  }

  putRegister(name: string): Observable<any> {
    return this.http.put<any>(this.resourceUrl(`api/contact/${name}`), name);
  }

  addAlbums(albums: FormGroup): Observable<any> {
    return this.http.post<any>(this.resourceUrl(`api/albums/`), albums.value);
  }
}
