import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/internalapi/iuser';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternalApiService {

  constructor(private http: HttpClient) { }

  getUsers() : Observable<IUser[]>
  {
    return this.http.get<IUser[]>(`${environment.INTERNAL_API_URL}users`);
  }
}
