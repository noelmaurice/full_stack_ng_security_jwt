import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../core/models/user";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "../../core/services/toastr.service";

@Component({
  selector: 'jwt-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  roles: Array<any> = [
    { name: "user", value: "ROLE_USER"},
    { name: "moderator", value: "ROLE_MOD"},
    { name: "administrator", value: "ROLE_ADMIN"},
  ];

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
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      roleArray: this.fb.array([], [Validators.required]),
    });
  }

  get username() { return this.form.get('username') }
  get password() { return this.form.get('password') }
  get email() { return this.form.get('email') }

  onSubmit(): void {
    let user: User = {
      "username": this.form.value.username,
      "password": this.form.value.password,
      "email": this.form.value.email,
      "roles": this.form.get('roleArray')?.value,
    }

    console.log("roles read", this.form.get('roleArray')?.value);
    console.log("user send", user);

    this.authService.register(user).subscribe(
      _ => {
        this.toastrService.displayMessage("Account created.", "success");
        this.form.reset();
        this.router.navigate(['/login']);
      },
      err => {
        console.log("error", err);
      }
    );
  }

  onRolesChange(e: any) {
    const isArray: FormArray = this.form.get('roleArray') as FormArray;
    if (e.target.checked) {
      isArray.push(new FormControl(e.target.value));
    }
    else
    {
      let i: number = 0;
      isArray.controls.forEach(item => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
