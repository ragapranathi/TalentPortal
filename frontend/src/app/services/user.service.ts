import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(userObj: any) {
    return this.http.post<any>(`${apiUrls.userServiceApi}`, userObj);
  }

  
}
