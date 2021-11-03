import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'jwt-board-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit {

  content?: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    const contentUrl = environment.server.url + environment.server.endpoints.content.admin;

    this.apiService.getContent(contentUrl).subscribe(
      data => {
        this.content = data.message;
      },
      err => {
        this.content = err.message;
      }
    );
  }
}
