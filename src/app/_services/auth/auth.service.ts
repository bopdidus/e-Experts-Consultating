import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {API_BASE_URL, ROUTE_PATH_TYPES} from '../../_models/constants.interface';

import UserLoginVM from '../../_models/_view-models/user-login-vm.interface';
import {UserRegisterVm} from '../../_models/_view-models/user-register-vm.interface';
import {UserType} from '../../_models/user.interface';
import {CString} from '../../_helpers/cstring.class';
import ResetPwdVm from '../../_models/_view-models/reset-pwd-vm.interface';
import {TokenStorageService} from '../token-storage/token-storage.service';
import { EncryptionService } from '../encryption.service';

const rootApiPath = `${API_BASE_URL}auth/{type}/`;

enum AuthActions {
  LOGIN, REGISTER, RESET_PWD
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService, private encryptor: EncryptionService) { }

  /**
   * Call backend api to authenticate a user.
   * @param credentials object containing data used to log a user.
*/
  login(credentials: UserLoginVM): Observable<any> {
    const {data, url} = this.sanitizeData(credentials, AuthActions.LOGIN);
    console.log(data, url);

    return this.http.post(`${url}`, data);
  }

  /**
   * Call backend api to create a new account for user
   * @param userInfos object containing data used to create a user.
   */
  register(userInfos: UserRegisterVm): Observable<any> {
    const {data, url} = this.sanitizeData(userInfos, AuthActions.REGISTER);
    //API_BASE_URL + 'auth/user/register'
    console.log(data, url);
    return this.http.post(`${url}`, data);
  }

  /**
   * Call backend api to reset a user password, according to its email.
   * @param resetModel Object containing Unique email of the user the password is going to be reset.
   */
  /*
  resetPwd(resetModel: ResetPwdVm): Observable<any> {
    const {data, url} = this.sanitizeData(resetModel, AuthActions.RESET_PWD);
    return this.http.post(url + 'lost-password', {data});
  }

  /**
   * Destroy all active user credentials

  logout(): void {
    this.tokenStorageService.signOut();
  }
*/

  /**
   * Prepare data before send it to backend api for the specified action purpose
   * @param input data we need to sanitize
   * @param action action we want to execute.
   */
  private sanitizeData(input: UserRegisterVm|UserLoginVM|ResetPwdVm, action: AuthActions): {data:any , url:string} {
    let data = null;
    let url;
    const formData = new FormData();

    if (action === AuthActions.REGISTER) {
      data = JSON.parse(JSON.stringify(input)) as UserRegisterVm;

      delete data.confirm_password;

      switch (data.type) {
        case UserType.SUBSCRIBER:
            delete data.company_name;
            delete data.trade_register;
            delete data.domain_activity;
            delete data.avatar;
            delete data.niu;
            delete data.work_place;
            delete data.national_order;
            delete data.international_order;
            delete data.experiences;
            delete data.type;
             data.isCompany =false;
        url=API_BASE_URL+'auth/subscriber/register'
        break;

        case UserType.COMPANY_EXPERT:
            delete data.firstname;
            delete data.lastname;
            delete data.nic;
            delete data.type
            delete data.avatar;
            delete data.sexe;
            data.isCompany = true;
            delete data.national_order;
            delete data.experience;
            delete data.international_order;
            url=API_BASE_URL+'auth/expert-company/register'
        break;

        case UserType.COMPANY_SUBSCRIBER:
            delete data.firstname;
            delete data.lastname;
            delete data.nic;
            delete data.type
            delete data.avatar;
            delete data.work_place
            delete data.sexe;
            data.isCompany = true;
            delete data.social_reason
            delete data.national_order;
            delete data.experience_count;
            delete data.international_order;
            url=API_BASE_URL+'auth/subscriber-company/register'
        break;

        case UserType.EXPERT:

          delete data.company_name;
          delete data.trade_id;
          delete data.domain_activity;
          delete data.avatar;
          delete data.social_reason
          delete data.type;
            data.isCompany =false;
          url=API_BASE_URL+'auth/expert/register'
        break;
      }

      return {data, url};
    }
    else if(action == AuthActions.LOGIN){
      data = JSON.parse(JSON.stringify(input)) as UserLoginVM;

      switch (data.type) {
        case UserType.SUBSCRIBER:
            url=API_BASE_URL+'auth/subscriber/login'
            delete data.trade_register
            delete data.type
        break;
        case UserType.COMPANY_SUBSCRIBER:
            url=API_BASE_URL+'auth/subscriber-company/login'
            delete data.nic
            delete data.type
        break;
        case UserType.EXPERT:
            url=API_BASE_URL+'auth/expert/login'
            delete data.trade_register
            delete data.type
        break;
        case UserType.COMPANY_EXPERT:
            url=API_BASE_URL+'auth/expert-company/login'
            delete data.nic
            delete data.type
        break;

      }
      return {data, url};
    }
  }
}
