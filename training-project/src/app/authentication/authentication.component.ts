import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService, AuthenticationResponseData } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  isLogin: boolean = true;
  isLoading: boolean = false;
  error:string = '';

  constructor(private AuthService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('recipeBookUser')) {
      this.router.navigate(['/recipes']);
    }
  }

  close() {
    this.error = '';
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let AuthObs: Observable<AuthenticationResponseData>;
    this.isLoading = true;

    if(this.isLogin) {
      AuthObs = this.AuthService.longIn(email, password);
    }else {
      AuthObs = this.AuthService.signUp(email, password)
    }

    AuthObs.subscribe(
      res => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset()
  }

}
