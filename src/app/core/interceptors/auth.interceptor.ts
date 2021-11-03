import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tokenKey: string = environment.server.url + environment.localStorage.token;

    const accessToken = localStorage.getItem(tokenKey);

    if (accessToken != null)
    {
      request = AuthInterceptor.addToken(request, accessToken);
    }

    request = AuthInterceptor.addContentType(request);

    return next.handle(request);
  }

  private static addContentType(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  private static addToken(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  }
}
