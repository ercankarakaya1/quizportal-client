import { Injectable } from '@angular/core';
import { keys } from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() {}

  //login user: set token to localStorage
  public setToken(token) {
    localStorage.setItem(keys.TOKEN_KEY, token);
    return true;
  }

  // get token from localStorage
  public getToken() {
    return localStorage.getItem(keys.TOKEN_KEY);
  }

  //set User to localStorage
  public setUser(user) {
    localStorage.setItem(keys.USER_KEY, JSON.stringify(user));
    localStorage.setItem(keys.USERNAME_KEY, JSON.stringify(user.username));
  }

  // get User from localStorage
  public getUser() {
    let user = localStorage.getItem(keys.USER_KEY);
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }

  public getUsername() {
    let username = localStorage.getItem(keys.USERNAME_KEY);
    return JSON.parse(username);
  }

  // get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority; //user.roles[0].name;
  }

  // isLogin: user is logged in or not
  public isLoggedIn() {
    let tokenStr = this.getToken();
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    return true;
  }

  //login user: set roles to localStorage
  public saveRoles(token) {
    localStorage.setItem(keys.AUTHORITIES_KEY, token);
    return true;
  }

  // get user roles
  public getRoles(): string[] {
    this.roles = [];
    if (localStorage.getItem(keys.TOKEN_KEY)) {
      JSON.parse(localStorage.getItem(keys.AUTHORITIES_KEY)).forEach((role) => {
        this.roles.push(role);
      });
    }
    return this.roles;
  }

  //logout: remove token from localStorage
  public logout() {
    localStorage.removeItem(keys.TOKEN_KEY);
    localStorage.removeItem(keys.USER_KEY);
    localStorage.removeItem(keys.USERNAME_KEY);
    return true;
  }
}
