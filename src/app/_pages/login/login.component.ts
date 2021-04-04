import { Component, OnInit } from '@angular/core';
import {CString} from '../../_helpers/cstring.class';
import {UserRegisterableTypes} from '../../_models/_view-models/user-register-vm.interface';
import UserLoginVM from '../../_models/_view-models/user-login-vm.interface';
import {TokenStorageService} from '../../_services/token-storage/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../_services/auth/auth.service';
import {User, UserType} from '../../_models/user.interface';
import {TranslationService} from '../../_services/translation/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: UserLoginVM = {} as UserLoginVM;
  hasError = false;
  loading = false;
  errorMessage = '';
  roles = UserRegisterableTypes;

  constructor(
    private tokenStorage: TokenStorageService,
    private translate: TranslationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.translate.useActive();
    const sendedStringType = this.route.snapshot.paramMap.get('type');
    const sendedType = parseInt(sendedStringType, 10);

    if (sendedType && !isNaN(sendedType)) {
      this.form.type = sendedType;
    }
  }

  ngOnInit(): void {
    if (this.tokenStorage.isLogged()) {
      // this.router.navigate(['home']);
    }
  }

  submit(): void {
    this.hasError = false;

    if ((CString.isNullOrWhiteSpace(this.form.nic) && CString.isNullOrWhiteSpace(this.form.email) ) ||
      CString.isNullOrWhiteSpace(this.form.password)) {
      this.showError('login.requiredFields');
      return;
    }

    this.loading = true;

    this.authService.login(this.form).subscribe(
      res => {
        this.loading = false;
        console.log(res);

        const us = JSON.parse(JSON.stringify(res.data)) as User;
        us.type = this.form.type;

        this.tokenStorage.saveUser(us);
        if(us.type == UserType.EXPERT){
          this.tokenStorage.saveToken(res.token)
          this.router.navigate(['expert/dashboard']);
        }
        else if(us.type == UserType.COMPANY_EXPERT){
          this.tokenStorage.saveToken(res.token)
          this.router.navigate(['expert/dashboard']);
        }
        else if (us.type == UserType.SUBSCRIBER){
          this.tokenStorage.saveToken(res.token)
          this.router.navigate(['subscriber/dashboard']);
        }

      },
      err => {
        this.showError("impossible de connecter");
        console.log(err);
      }
    );
  }

  showError(ressource: string): void {
    this.hasError = true;
    this.loading = false;
    this.errorMessage = ressource;
    setTimeout(() => { this.hasError = false; }, 5000);
  }

}
