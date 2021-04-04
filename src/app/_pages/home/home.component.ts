import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {TranslationService} from '../../_services/translation/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentLang: string;

  constructor(private translate: TranslationService) {
    this.translate.useActive();
    this.currentLang = this.translate.getActiveLang();
  }

  ngOnInit(): void {
  }

  switchLanguage(lang: string): void{
    this.translate.switchLangTo(lang);
    this.currentLang = this.translate.getActiveLang();
  }

}
