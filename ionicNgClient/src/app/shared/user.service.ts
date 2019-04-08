import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url = 'http://localhost:5555/users';

  constructor(private httpClient: HttpClient) {

  }

  getUsersList() {
    return this.httpClient.get(this.url);
  }

  postUser(usr: User) {
    return this.httpClient.post(this.url, usr);
  }

  putUser(usr: User) {
    return this.httpClient.put(this.url + `/${usr._id}`, usr);
  }

  deleteUser(_id: string) {
    return this.httpClient.delete(this.url + `/${_id}`);
  }

}
