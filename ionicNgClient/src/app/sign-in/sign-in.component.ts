import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from '../shared/register.service';
import { SubscriberLogin } from '../shared/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  loginSubscriber: SubscriberLogin;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  constructor(private registerService: RegisterService, private router: Router) {
    if (this.registerService.isLoggedIn()) {
      this.router.navigateByUrl('/user-details');
    }
  }

  onSubmit(form: NgForm) {
    console.log(`form value ${JSON.stringify(form.value)}`);
    this.registerService.signIn(form.value).subscribe(
      res => {
        this.registerService.setToken(res['token']);
        this.router.navigateByUrl('/user-details');
        this.formReset(form);
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  formReset(form?: NgForm) {
    this.loginSubscriber = {
      email: '',
      password: ''
    };
    form.resetForm(form);
    this.serverErrorMessages = '';
  }

  get diagnostic() {
    return JSON.stringify(this.loginSubscriber);
  }

}
