import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { BoardModeratorComponent } from './board/moderator/moderator.component';
import { AdminComponent } from './board/admin/admin.component';
import { UserComponent } from './board/user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardPublicComponent } from './board/public/board-public.component';
import {CoreModule} from "../core/core.module";
import { ProtectedComponent } from './protected.component';
import { ApiComponent } from './api/api.component';
import {NgxJsonViewModule} from "ng-json-view";

@NgModule({
  declarations: [
    BoardModeratorComponent,
    AdminComponent,
    UserComponent,
    ProfileComponent,
    BoardPublicComponent,
    ProtectedComponent,
    ApiComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    CoreModule,
    NgxJsonViewModule
  ]
})
export class ProtectedModule { }
