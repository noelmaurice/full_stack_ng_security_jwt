import { Component, OnInit } from '@angular/core';
import {User} from "../../core/models/user";
import {Subscription} from "rxjs";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'jwt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user?: User|null;
  private subscription!: Subscription;

  accessToken?: string|null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe(user => this.update(user));
  }

  update(user: User|null): void {
    this.user = user;

    if (user != null)
    {
      this.accessToken = this.authService.getAccessToken();
    }
  }

}
