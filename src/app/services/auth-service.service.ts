import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user-interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/v1';

  private usernameSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  username$: Observable<string> = this.usernameSubject.asObservable();

  setUserName(username: string): void {
    this.usernameSubject.next(username);
  }

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL + '/login', user);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL + '/register', user);
  }
}
