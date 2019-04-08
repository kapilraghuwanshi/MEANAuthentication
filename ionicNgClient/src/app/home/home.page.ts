import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../app/shared/user.service';
import { User } from '../shared/user.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedUser: User;
  users: User[];

  constructor(private userServ: UserService) {
    this.resetForm();
    this.refreshList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.selectedUser = {
        _id: '',
        name: '',
        email: '',
        phone: null,
        country: ''
      };
    }
  }
  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      this.userServ.postUser(form.value).subscribe((resp) => {
        console.log(resp);
        alert('Data Saved successfully!!');
        this.resetForm(form);
        this.refreshList();
      });
    } else {
      this.userServ.putUser(form.value).subscribe((resp) => {
        console.log(resp);
        alert('Data Updated successfully!!');
        this.resetForm(form);
        this.refreshList();
      });
    }
  }

  refreshList() {
    this.userServ.getUsersList().subscribe((resp) => {
      this.users = resp as User[];
      console.log(this.users);
    });
  }

  onEdit(usr: User) {
    this.selectedUser = usr;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you really deleting it?') === true) {
      this.userServ.deleteUser(_id).subscribe((resp) => {
        this.refreshList();
        this.resetForm(form);
        alert('Deleted successfully..');
      });
    }
  }

  get diagnostic() {
    return JSON.stringify(this.selectedUser);
  }

}
