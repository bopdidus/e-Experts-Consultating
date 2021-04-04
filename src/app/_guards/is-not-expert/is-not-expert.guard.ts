import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../../_services/token-storage/token-storage.service';
import {CString} from '../../_helpers/cstring.class';
import {UserType} from '../../_models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class IsNotExpertGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const us = this.tokenStorageService.getUser();
//us != null && !CString.isNullOrWhiteSpace(us.id) && us.type !== UserType.EXPERT
    return true ;

  }
}
