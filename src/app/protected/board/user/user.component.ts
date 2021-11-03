import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'jwt-board-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {

  content?: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    const contentUrl = environment.server.url + environment.server.endpoints.content.user;

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
