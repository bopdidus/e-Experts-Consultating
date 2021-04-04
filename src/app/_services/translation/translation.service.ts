import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {APP_LANG_KEY} from '../../_models/constants.interface';
import {CString} from '../../_helpers/cstring.class';

const APP_DEFAULT_LANGUAGE = 'fr';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private t: TranslateService) { }

  setDefaultLanguage(): void {
    const lang = this.getActiveLang();
    const l = CString.isNullOrWhiteSpace(lang) ? APP_DEFAULT_LANGUAGE : lang;

    this.t.setDefaultLang(l);
    this.saveActiveLang(l);
  }

  switchLangTo(lang: string = APP_DEFAULT_LANGUAGE): void{
    const l = CString.isNullOrWhiteSpace(lang) ? APP_DEFAULT_LANGUAGE : lang;
    this.t.use(l);
    this.saveActiveLang(l);
  }

  useActive(): void {
    let l = this.getActiveLang();
    l = CString.isNullOrWhiteSpace(l) ? APP_DEFAULT_LANGUAGE : l;
    this.switchLangTo(l);
  }

  private saveActiveLang(lang: string = APP_DEFAULT_LANGUAGE): void {
    window.sessionStorage.setItem(APP_LANG_KEY, lang);
  }

  getActiveLang(): string {
    return window.sessionStorage.getItem(APP_LANG_KEY);
  }
}
