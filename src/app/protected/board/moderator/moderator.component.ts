import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'jwt-board-moderator',
  templateUrl: './moderator.component.html',
  styles: [
  ]
})
export class BoardModeratorComponent implements OnInit {

  content?: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    const contentUrl = environment.server.url + environment.server.endpoints.content.moderator;

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
