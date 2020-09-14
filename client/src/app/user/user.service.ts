import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ReplaySubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  // ReplaySubject waits to emit value, we tell it how many values to hold(1)
  private userSource = new ReplaySubject<IUser>(1);
  user$ = this.userSource.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  dummyUser = {
    email: 'abc@abc.com',
    name: 'abcabcabc',
    token: 'token',
  };

  // get user
  loadCurrentUser(token: string): Observable<void> {
    console.log(token);
    if (token === null) {
      this.userSource.next(null);
      return of(null);
    }
    // TODO - hit backend
    this.userSource.next(this.dummyUser);
    return of(null);
  }

  // login
  login(values: any): Observable<void> {
    return null;
  }

  // register
  register(values: any): Observable<void> {
    return null;
  }

  // change password
  changePassword(): Observable<void> {
    return null;
  }

  // edit user
  editUser(): Observable<void> {
    return null;
  }

  // delete user
  deleteUser(): Observable<void> {
    return null;
  }

  // get searchable users
  getSearchableUsers(): Observable<void> {
    return null;
  }

  // logout
  logout(): void {
    return null;
  }
}
