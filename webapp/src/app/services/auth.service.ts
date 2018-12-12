import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint = `${environment.authApiUrl}`;
  private sessionStatus: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) { }

  public login(user: User) {
    const credentials = {
      username: user.username,
      password: user.password
    };
    return this.http.post(`${this.endpoint}/login/`, credentials);
  }

  public logout() {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.token}`
    });
    return this.http.post(`${this.endpoint}/logout/`, {}, {headers: headers});
  }

  public getMe() {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.token}`
    });
    return this.http.get(`${this.endpoint}/user/`, {headers: headers});
  }

  public isAuthenticated() {
    return localStorage.getItem('token') != undefined;
  }

  public observeSessionStatusChanges() {
    return this.sessionStatus;
  }

  public changeSesionStatus(value = false) {
    this.sessionStatus.next(value);
  }

}
