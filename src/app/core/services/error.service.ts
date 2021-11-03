import { Injectable } from '@angular/core';
import {throwError} from "rxjs";
import {ToastrService} from "./toastr.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService: ToastrService) { }

  handleError(error: any) : any {
    let message: any = error.error.message;

    if (message == null)
    {
      message = error.message;
    }

    this.toastrService.displayMessage(message, 'danger');

    return throwError(error);
  }
}
