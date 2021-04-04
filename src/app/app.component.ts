import { Component } from '@angular/core';
import {TranslationService} from './_services/translation/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'experts';
  constructor(private translate: TranslationService) {
    translate.setDefaultLanguage();
  }
}
