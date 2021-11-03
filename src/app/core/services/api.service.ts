import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, finalize} from "rxjs/operators";
import {ErrorService} from "./error.service";
import {LoaderService} from "./loader.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private errorService: ErrorService,
              private loaderService: LoaderService) { }

  getContent(contentUrl: string): Observable<any> {

    this.loaderService.setLoading(true);

    return this.http.get(contentUrl, { responseType: 'json' })
      .pipe(
        catchError(error => this.errorService.handleError(error)),
        finalize(() => this.loaderService.setLoading(false))
      )
  }
}
