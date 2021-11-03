import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";

import {Router} from "@angular/router";
import {User} from "../../core/models/user";
import {ToastrService} from "../../core/services/toastr.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'jwt-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'username': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
    });
  }

  get username() { return this.form.get('username') }
  get password() { return this.form.get('password') }

  onSubmit(): void {
    let user: User = {
      "username": this.form.value.username,
      "password": this.form.value.password
    }
    this.authService.login(user).subscribe(
      _ => {
        this.toastrService.displayMessage("Identification done.", "success");
        this.form.reset();
        this.router.navigate([environment.routes.home]);
      },

    );
  }

}
