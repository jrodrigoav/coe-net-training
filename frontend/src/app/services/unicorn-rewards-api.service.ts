import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV_CONFIG, IEnvironmentConfig } from '../interfaces/environment-config';
import { IScvResponse } from '../interfaces/iscvResponse';

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

  putRegister(name: string): Observable<any> {
    return this.http.put<any>(this.resourceUrl(`api/contact/${name}`), name);
  }

  readScv(fileByteArray: FormData): Observable<IScvResponse> {
    //return this.http.post<IScvResponse>(this.resourceUrl(`api/contact?file=${fileByteArray}`), fileByteArray);
    return this.http.post<IScvResponse>(this.resourceUrl('api/contact'), fileByteArray);
  }
}
