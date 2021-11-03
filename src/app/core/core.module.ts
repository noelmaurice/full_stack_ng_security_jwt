import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PublicModule } from '../public/public.module';
import {HttpClientModule} from "@angular/common/http";

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ToastrComponent } from './components/toastr/toastr.component';
import {CustomPluralPipe} from "./pipes/custom-plural.pipe";


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    ToastrComponent,
    CustomPluralPipe
  ],
  imports: [
    CommonModule,
    PublicModule,
    HttpClientModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    ToastrComponent,
    CustomPluralPipe,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
