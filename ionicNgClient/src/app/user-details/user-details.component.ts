import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../shared/register.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  subscriberDetails;
  constructor(private registerService: RegisterService, private router: Router) {

    this.registerService.getSubscriberProfile().subscribe(
      res => {
        this.subscriberDetails = res['user'];
      },
      err => {
        console.log(err);

      }
    );
  }

  onLogout() {
    this.registerService.deleteToken();
    this.router.navigate(['/signin']);
  }

}
