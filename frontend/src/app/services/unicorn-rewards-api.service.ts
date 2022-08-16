import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV_CONFIG, IEnvironmentConfig } from '../interfaces/environment-config';
import { IQuestion, IQuestionsResponse } from '../interfaces/iquestions';
import { IScvResponse } from '../interfaces/iscvResponse';
import { Itab, ITabsResponse } from '../interfaces/itabs';
import { IUser } from '../interfaces/iuser';
import { IUserResponse } from '../interfaces/iuser-list';

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

  readScv(fileByteArray: FormData): Observable<IScvResponse> {
    //return this.http.post<IScvResponse>(this.resourceUrl(`api/contact?file=${fileByteArray}`), fileByteArray);
    return this.http.post<IScvResponse>(this.resourceUrl('api/users'), fileByteArray);
  }

  getUserList(name: string): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(this.resourceUrl('api/users?name=' + name));
  }

  createUser(user: IUser): Observable<Number> {
    return this.http.post<Number>(this.resourceUrl('api/users'), user);
  }

  updateUser(id: Number, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.resourceUrl(`api/users/${id}`), user);
  }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.resourceUrl('api/users/') + id);
  }

  getTabsList(): Observable<ITabsResponse> {
    return this.http.get<ITabsResponse>(this.resourceUrl('api/tabs'))
  }

  deleteTab(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.resourceUrl('api/tabs/') + id)
  }

  createTab(tabmodel: Itab): Observable<number>{
    return this.http.post<number>(this.resourceUrl('api/tabs'), tabmodel);
  }

  getQuestionsList(status: boolean): Observable<IQuestionsResponse>{
    return this.http.get<IQuestionsResponse>(this.resourceUrl('api/questions/true'))
  }

  createQuestion(question: IQuestion): Observable<number>{
    return this.http.post<number>(this.resourceUrl('api/questions'), question);
  }

  getSuggestedAnswers(id: number): Observable<string[]>{
    return this.http.get<string[]>(this.resourceUrl('api/questions/' + id));
  }
}