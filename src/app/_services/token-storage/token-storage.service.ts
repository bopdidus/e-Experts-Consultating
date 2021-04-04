import { Injectable } from '@angular/core';
import {TOKEN_KEY, USER_KEY} from '../../_models/constants.interface';
import {User} from '../../_models/user.interface';
import {CString} from '../../_helpers/cstring.class';
import { IExpert, ISubscriber} from '../../_models/models.interface';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  /**
   * Clears all user data in app session storage.
   */
  signOut(): void {
    window.sessionStorage.clear();
  }
  /**
   * Save user token in app session storage
   * @param token A string returned by the backend api used to identify a logged in user.
   */
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  /**
   * Returns the current user's token or null if no user is currently logged in.
   */
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  /**
   * Saves loged user infos in app session storage.
   * @param user Logged user.
   */
  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  /**
   * Get the current logged user or empty object if no user is logged in.
   */
  public getUser(): IExpert|ISubscriber {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {} as User;
  }
  /**
   * Checks whether there is a user currently logged in.
   * Returns `true` is there isa user logged and `false` otherwise.
   */
  public isLogged(): boolean {
    const us = this.getUser();
//us && !CString.isNullOrWhiteSpace(us.id) && !CString.isNullOrWhiteSpace(this.getToken())
    return (true);
  }
}
