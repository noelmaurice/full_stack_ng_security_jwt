import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {Observable, Subscription} from "rxjs";
import {environment} from "../../../../environments/environment";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'jwt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user?: User|null;
  private subscription!: Subscription;

  isAdmin!: boolean;
  isModerator!: boolean;
  isUser!: boolean;

  isLoading$!: Observable<boolean>;
  activePath!: string;

  homePath: string = environment.routes.home;
  loginPath: string = environment.routes.login;
  registerPath: string = environment.routes.register;
  profilePath: string = environment.routes.profile;

  constructor(private router: Router,
              private authService: AuthService,
              private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.subscription =
      this.authService.user$.subscribe(user => this.updateUser(user));
    this.activePath = this.homePath;
    this.isLoading$ = this.loaderService.isLoading$;
  }

  updateUser(user: User|null): void {
    this.user = user;

    if (user != null)
    {
      this.isAdmin = user.roles!.includes('ROLE_ADMIN');
      this.isModerator = user.roles!.includes('ROLE_MODERATOR');
      this.isUser = user.roles!.includes('ROLE_USER');
    }
    else
    {
      this.isAdmin = false;
      this.isModerator = false;
      this.isUser = false;
    }
  }

  logout() {
    this.authService.logout();
    this.activePath = this.loginPath;
  }


  public navigate(page: string): void {
    this.router.navigate([page]);
    this.activePath = page;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
