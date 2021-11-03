import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../../core/models/user";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'jwt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscription?: Subscription;
  user?: User|null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe(user =>
      this.user = user
    );
  }

}
