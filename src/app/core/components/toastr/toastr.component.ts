import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Toastr} from "../../models/toastr";
import {ToastrService} from "../../services/toastr.service";

@Component({
  selector: 'jwt-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {

  toastr$?: Observable<Toastr|null>;

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
    this.toastr$ = this.toastrService.toastr$;
  }

  closeToastr() {
    this.toastrService.closeToastr();
  }
}
