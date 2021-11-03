import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../../environments/environment";
import {catchError, delay, finalize, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import jwt_decode, { JwtPayload } from 'jwt-decode';
import {LoaderService} from "./loader.service";
import {ErrorService} from "./error.service";
import {ToastrService} from "./toastr.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  readonly user$: Observable<User|null> = this.user.asObservable();

  static tokenKey: string = environment.server.url + environment.localStorage.token;
  static userKey: string = environment.server.url + environment.localStorage.user;

  constructor(private http: HttpClient,
              private router: Router,
              private loaderService: LoaderService,
              private errorService: ErrorService,
              private toastrService: ToastrService) { }

  login(user: User): Observable<any> {
    this.loaderService.setLoading(true);
    const LOGIN_URL = environment.server.url + environment.server.endpoints.auth.login;

    return this.http.post(LOGIN_URL, {
      "username": user.username,
      "password": user.password
      }, {})
      .pipe(
        tap((data: any) =>
        {
          let user: User = {
            "username": data.username,
            "email": data.email,
            "roles": data.roles
          };

          this.user.next(user);
          AuthService.saveSecurityInformation(data.accessToken, user);

        }),
        tap(_ => this.logoutTimer()),
        catchError(error => this.errorService.handleError(error)),
        finalize(() => this.loaderService.setLoading(false))
    );
  }

  register(user: User): Observable<any> {
    this.loaderService.setLoading(true);
    const REGISTER_URL = environment.server.url + environment.server.endpoints.auth.register;

    return this.http.post(REGISTER_URL, {
      "username": user.username,
      "password": user.password,
      "email": user.email,
      "roles": user.roles
      }, {})
      .pipe(
        catchError(error => this.errorService.handleError(error)),
        finalize(() => this.loaderService.setLoading(false))
      )
  }

  tryAutoLogin(): void {

    const expirationDate = this.getExpValueToken();
    if(expirationDate == null)
    {
      return;
    }

    const now = new Date().getTime();
    if (now >= expirationDate) {
      return;
    }

    const user: User = JSON.parse(<string>localStorage.getItem(AuthService.userKey));
    if (user != null)
    {
      this.toastrService.displayMessage("Session restored", 'success');
    }

    this.user.next(user);
  }


  private static saveSecurityInformation(token: string, user: User) {
    localStorage.setItem(AuthService.tokenKey, token);
    localStorage.setItem(AuthService.userKey, JSON.stringify(user));
  }

  private static deleteSecurityInformation() {
    localStorage.removeItem(AuthService.tokenKey);
    localStorage.removeItem(AuthService.userKey);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(AuthService.tokenKey);
  }

  logout(): void {
    this.user.next(null);
    AuthService.deleteSecurityInformation();
  }

  getExpValueToken(): number | null {

    var token: string | null = localStorage.getItem(AuthService.tokenKey);

    if (token != null) {
      const decoded = jwt_decode<JwtPayload>(token || '') || null;
      return (Number)(decoded.exp) * 1000;
    }

    return null;
}

  private logoutTimer(): void {

    var token: string | null = localStorage.getItem(AuthService.tokenKey);

    if (token == null) {
      this.logout();
    }

    const exp: number = this.getExpValueToken()!;
    const now = new Date().getTime();
    const expireDate = exp - now;

    of(true).pipe(
      delay(expireDate * 1000)
    ).subscribe(_ => this.logout());
  }

}
