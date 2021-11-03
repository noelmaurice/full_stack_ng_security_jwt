import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'jwt-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  content?: JSON|string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    const contentUrl = environment.server.url + environment.server.endpoints.documentation.swagger;

    this.apiService.getContent(contentUrl).subscribe(
      data => {
        console.log('data', data);
        this.content = data;
      },
      err => {
        this.content = err.message;
      }
    );
  }

}
