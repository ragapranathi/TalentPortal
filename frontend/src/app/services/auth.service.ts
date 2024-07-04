import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}`, loginObj);
  }
}
