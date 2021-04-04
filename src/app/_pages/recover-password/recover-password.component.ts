import { Component, OnInit } from '@angular/core';
import {CString} from '../../_helpers/cstring.class';
import {AuthService} from '../../_services/auth/auth.service';
import ResetPwdVm from '../../_models/_view-models/reset-pwd-vm.interface';
import {TokenStorageService} from '../../_services/token-storage/token-storage.service';
import {TranslationService} from '../../_services/translation/translation.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  form: ResetPwdVm = {} as ResetPwdVm;
  errorMessage: string = null;
  hasError = false;
  loading = false;
  succeeded = false;

  constructor(private authService: AuthService,
              private translate: TranslationService,
              private tokenStorageService: TokenStorageService) {
    this.translate.useActive();
    //this.form.type = this.tokenStorageService.getUser().type;
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.hasError = false;

    if (CString.isNullOrWhiteSpace(this.form.email)) {
      this.showError('recover_password.email_required');
      return;
    }

    if (!CString.IsValidEmail(this.form.email)) {
      this.showError('recover_password.invalid_email');
      return;
    }

    this.loading = true;

   /* this.authService.resetPwd(this.form).subscribe(
      data => {
        this.loading = false;
        this.succeeded = true;
        console.log(data);
      },
      err => {
        this.showError(err.message);
        console.log(err);
      }
    );*/
  }

  showError(ressource: string): void {
    this.hasError = true;
    this.loading = false;
    this.errorMessage = ressource;
    setTimeout(() => { this.hasError = false; }, 5000);
  }

}
