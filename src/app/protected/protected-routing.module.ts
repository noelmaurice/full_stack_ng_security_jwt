import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./board/user/user.component";
import {BoardModeratorComponent} from "./board/moderator/moderator.component";
import {AdminComponent} from "./board/admin/admin.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {ApiComponent} from "./api/api.component";

const routes: Routes = [
  {
    path: 'app',
    children:
    [
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'moderator', component: BoardModeratorComponent, canActivate: [AuthGuard] },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'documentation', component: ApiComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
