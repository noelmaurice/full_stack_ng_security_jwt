import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, timer} from "rxjs";
import {Toastr} from "../models/toastr";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  private toastr: BehaviorSubject<Toastr|null> = new BehaviorSubject<Toastr|null>(null);

  readonly toastr$: Observable<Toastr|null> = this.toastr.asObservable();

  constructor() { }

  displayMessage(message: string, category: Toastr['category']) {
    let toastr: Toastr = ({
      category: category,
      message: message
    });

    this.showToastr(toastr);
  }

  private showToastr(toastr: Toastr): void {
    timer(0, 5000).pipe(take(2)).subscribe(i => {
      if (i === 0) {
        this.toastr.next(toastr);
      } else {
        this.toastr.next(null);
      }
    });
  }

  closeToastr(): void{
    this.toastr.next(null);
  }
}
