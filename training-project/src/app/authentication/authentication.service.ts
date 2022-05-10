import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { environment } from '../../environments/environment';

export interface AuthenticationResponseData {
  [x: string]: any;
  kind?: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user = new BehaviorSubject<User | any>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthenticationResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap( res => {
      this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)
    }));
  }

  longIn(email: string, password: string) {
    return this.http.post<AuthenticationResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap( res => {
      this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)
    }));
  }

  autoLogIn() {
    var userData = localStorage.getItem('recipeBookUser');
    const user: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(userData || 'null');
    if(!userData) {
      return;
    }

    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }

    const expirationTimer = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogOut(expirationTimer);
  }

  autoLogOut(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationTime);
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/authentication']);
    localStorage.removeItem('recipeBookUser');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate: Date = new Date(new Date().getTime() + expiresIn * 1000);
    const user: User = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('recipeBookUser', JSON.stringify(user));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string = "An unknown error occurred!";
      if ( !err.error || !err.error.error) {
        return throwError(() => errorMessage);
      }
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This Email ID Already Exist';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This Email Does Not Exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This Password is Not Correct';
          break;
      }
      return throwError(() => errorMessage);
  }
}
