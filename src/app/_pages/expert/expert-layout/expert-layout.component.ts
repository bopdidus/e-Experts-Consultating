import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from '../../../_models/user.interface';
import {UserType} from '../../../_models/user.interface';
import {TokenStorageService} from '../../../_services/token-storage/token-storage.service';
import {IExpert} from '../../../_models/models.interface';
import {TranslationService} from '../../../_services/translation/translation.service';

@Component({
  selector: 'app-expert-layout',
  templateUrl: './expert-layout.component.html',
  styleUrls: ['./expert-layout.component.css']
})
export class ExpertLayoutComponent implements OnInit, AfterViewInit {

  user: IExpert = {} as IExpert;
  userRoles = UserType;
  hidden;

  constructor(private tokenStorageService: TokenStorageService,
              private translate: TranslationService) {
    this.translate.useActive();
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser() as IExpert;
    console.log(this.user)
    this.hidden = "false"
  }

  ngAfterViewInit(): void {
    //$('.mat-drawer-inner-container').addClass('overflow-hidden');
  }

}
