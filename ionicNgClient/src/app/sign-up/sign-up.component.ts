import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../shared/register.service';
import { Subscriber } from '../shared/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  selectedSubsciber: Subscriber;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private registerServ: RegisterService, private router: Router) {

  }
  onSubmit(form: NgForm) {
    console.log(`form value ${JSON.stringify(form.value)}`);
    this.registerServ.postSubscriber(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 8000);
        this.router.navigateByUrl('/signin');
        this.formReset(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      }
    );
  }

  formReset(form?: NgForm) {
    this.selectedSubsciber = {
      _id: '',
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm(form);
    this.serverErrorMessages = '';
  }

  get diagnostic() {
    // console.log('%cInside Diagonistic', 'color:blue;background-color:yellow;font-size:11px;');
    return JSON.stringify(this.selectedSubsciber);
  }

}
