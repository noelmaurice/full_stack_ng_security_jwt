import { Component } from '@angular/core';
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'jwt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-security-jwt';

  constructor(
    private authService: AuthService) {}

  ngOnInit() {
    this.authService.tryAutoLogin();
  }


}
