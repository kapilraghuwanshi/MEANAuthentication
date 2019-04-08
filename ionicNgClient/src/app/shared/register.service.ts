import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Subscriber, SubscriberLogin } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // for requests without auth/tokens
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private httpClient: HttpClient) {

  }

  // HttpMethods

  postSubscriber(usr: Subscriber) {
    console.log(`user details in postSubscriber - ${usr}`);
    return this.httpClient.post(environment.apiBaseUrl + '/register', usr, this.noAuthHeader);
  }

  signIn(authCredentials: SubscriberLogin) {
    return this.httpClient.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  // we want to add token to request
  getSubscriberProfile() {
    return this.httpClient.get(environment.apiBaseUrl + '/subsProfile');
  }

  // Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

}
