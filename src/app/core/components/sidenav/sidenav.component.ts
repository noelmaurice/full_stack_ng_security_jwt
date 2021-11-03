import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Subscription} from "rxjs";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'jwt-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  homePath: string = environment.routes.home;
  loginPath: string = environment.routes.login;
  registerPath: string = environment.routes.register;
  publicPath: string = environment.routes.public;
  userPath: string = environment.routes.user;
  moderatorPath: string = environment.routes.moderator;
  adminPath: string = environment.routes.admin;
  profilePath: string = environment.routes.profile;
  documentationPath: string = environment.routes.documentation;

  subscription?: Subscription;
  user?: User|null;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user =>
      this.user = user
    );
  }

  public isActive(page: string): boolean {
    return this.router.url == '/' + page;
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }

  isRoleExists(item: string): boolean {
    if (this.user != null) {
      return <boolean>this.user!.roles!.includes(item);
    }
    return false;
  }

}
